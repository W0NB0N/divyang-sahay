import { UserProfile, Scheme, SchemeMatchResult, MatchReason, EligibilityStatus } from '../types/scheme';
import { SCHEMES_DATA } from '../data/schemes';

export function matchSchemes(profile: UserProfile, customSchemes?: Scheme[]): SchemeMatchResult[] {
  const schemes = customSchemes || SCHEMES_DATA;
  const results: SchemeMatchResult[] = [];

  for (const scheme of schemes) {
    const matchReasons: MatchReason[] = [];
    const missingOrCheckReasons: MatchReason[] = [];
    let score = 0;
    let eligible = true;
    let isPartial = false;

    // 1. Need Category Match
    const matchesNeed = profile.needs.length === 0 || profile.needs.includes(scheme.category);
    if (matchesNeed) {
      score += 25;
      matchReasons.push({
        matched: true,
        type: 'need',
        text: `Matches your interest in ${formatCategoryName(scheme.category, 'en')}`,
        textHi: `आपकी चुनी गई आवश्यकता (${formatCategoryName(scheme.category, 'hi')}) से मेल खाता है`,
      });
    }

    // 2. Disability Type Match
    const isAnyDisability = scheme.applicableDisabilities.includes('any');
    const hasDisabilityMatch = isAnyDisability || (
      profile.disabilityTypes.length > 0 &&
      profile.disabilityTypes.some(type => scheme.applicableDisabilities.includes(type) || type === 'any')
    );

    if (profile.disabilityTypes.length === 0) {
      isPartial = true;
      missingOrCheckReasons.push({
        matched: false,
        type: 'disability',
        text: 'Specify your disability type to confirm medical coverage',
        textHi: 'चिकित्सा कवरेज की पुष्टि के लिए अपनी दिव्यांगता का प्रकार चुनें',
      });
    } else if (hasDisabilityMatch) {
      score += 25;
      matchReasons.push({
        matched: true,
        type: 'disability',
        text: isAnyDisability
          ? 'Open for all recognized RPwD disability categories'
          : 'Covers your specific disability condition',
        textHi: isAnyDisability
          ? 'सभी 21 आरपीडब्ल्यूडी दिव्यांगता श्रेणियों के लिए मान्य'
          : 'आपकी विशिष्ट दिव्यांगता स्थिति के लिए स्वीकृत',
      });
    } else {
      eligible = false;
      missingOrCheckReasons.push({
        matched: false,
        type: 'disability',
        text: 'Applies specifically to other listed disability categories',
        textHi: 'यह योजना केवल विशिष्ट दिव्यांग श्रेणियों के लिए लागू है',
      });
    }

    // 3. Disability Percentage / Benchmark Rule
    const userPercent = profile.disabilityPercentage ?? (profile.isBenchmark === 'yes' ? 40 : 0);
    if (scheme.minDisabilityPercentage) {
      if (profile.disabilityPercentage === null && profile.isBenchmark === 'dont_know') {
        isPartial = true;
        missingOrCheckReasons.push({
          matched: false,
          type: 'disability',
          text: `Requires minimum ${scheme.minDisabilityPercentage}% disability certificate (Needs verification)`,
          textHi: `न्यूनतम ${scheme.minDisabilityPercentage}% दिव्यांगता प्रमाण पत्र आवश्यक (जांच आवश्यक)`,
        });
      } else if (userPercent >= scheme.minDisabilityPercentage) {
        score += 20;
        matchReasons.push({
          matched: true,
          type: 'disability',
          text: `Disability percentage (${userPercent}%) meets minimum requirement of ${scheme.minDisabilityPercentage}%`,
          textHi: `दिव्यांगता प्रतिशत (${userPercent}%) न्यूनतम आवश्यकता (${scheme.minDisabilityPercentage}%) को पूरा करता है`,
        });
      } else {
        eligible = false;
        missingOrCheckReasons.push({
          matched: false,
          type: 'disability',
          text: `Requires minimum ${scheme.minDisabilityPercentage}% disability (You entered ${userPercent}%)`,
          textHi: `न्यूनतम ${scheme.minDisabilityPercentage}% दिव्यांगता आवश्यक (आपने ${userPercent}% दर्ज किया)`,
        });
      }
    } else if (scheme.requiresBenchmark) {
      if (profile.isBenchmark === 'yes' || (profile.disabilityPercentage && profile.disabilityPercentage >= 40)) {
        score += 20;
        matchReasons.push({
          matched: true,
          type: 'disability',
          text: 'Person with benchmark disability (40%+ certified)',
          textHi: 'मानक दिव्यांगता (40%+ प्रमाणित) की शर्त पूरी',
        });
      } else if (profile.isBenchmark === 'dont_know') {
        isPartial = true;
        missingOrCheckReasons.push({
          matched: false,
          type: 'disability',
          text: 'Requires benchmark disability certificate (40% or more)',
          textHi: 'मानक दिव्यांगता प्रमाण पत्र (40% या अधिक) आवश्यक',
        });
      } else {
        eligible = false;
      }
    } else {
      score += 15;
    }

    // 4. Financial & BPL Match
    if (scheme.requiresBPL) {
      if (profile.isBPL === true) {
        score += 15;
        matchReasons.push({
          matched: true,
          type: 'bpl',
          text: 'Matches BPL / Antyodaya financial criterion',
          textHi: 'बीपीएल / अंत्योदय वित्तीय पात्रता पूरी होती है',
        });
      } else if (profile.isBPL === null) {
        isPartial = true;
        missingOrCheckReasons.push({
          matched: false,
          type: 'bpl',
          text: 'Applicable specifically for BPL / low income card holders',
          textHi: 'विशेष रूप से बीपीएल / कम आय वाले परिवारों के लिए',
        });
      } else {
        eligible = false;
        missingOrCheckReasons.push({
          matched: false,
          type: 'bpl',
          text: 'Requires BPL / Antyodaya Ration Card status',
          textHi: 'बीपीएल / अंत्योदय राशन कार्ड होना आवश्यक',
        });
      }
    } else if (scheme.maxAnnualIncome) {
      if (profile.annualIncome === null) {
        isPartial = true;
        missingOrCheckReasons.push({
          matched: false,
          type: 'income',
          text: `Annual family income limit is ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} Lakh (Income proof required)`,
          textHi: `वार्षिक पारिवारिक आय सीमा ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} लाख तक (आय प्रमाण आवश्यक)`,
        });
      } else if (profile.annualIncome <= scheme.maxAnnualIncome) {
        score += 15;
        matchReasons.push({
          matched: true,
          type: 'income',
          text: `Annual income falls well within the ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} Lakh limit`,
          textHi: `वार्षिक आय ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} लाख की निर्धारित सीमा के भीतर है`,
        });
      } else {
        eligible = false;
        missingOrCheckReasons.push({
          matched: false,
          type: 'income',
          text: `Family income exceeds scheme limit of ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} Lakh/yr`,
          textHi: `पारिवारिक आय योजना की ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} लाख/वर्ष सीमा से अधिक है`,
        });
      }
    } else {
      score += 10;
      matchReasons.push({
        matched: true,
        type: 'income',
        text: 'No strict family income limit for this benefit',
        textHi: 'इस योजना में परिवार की आय की कोई पाबंदी नहीं है',
      });
    }

    // 5. Age Match
    if (profile.age !== null) {
      const minAgeOk = scheme.minAge === undefined || profile.age >= scheme.minAge;
      const maxAgeOk = scheme.maxAge === undefined || profile.age <= scheme.maxAge;
      if (minAgeOk && maxAgeOk) {
        score += 10;
        matchReasons.push({
          matched: true,
          type: 'age',
          text: `Your age (${profile.age} yrs) is within eligible range`,
          textHi: `आपकी आयु (${profile.age} वर्ष) निर्धारित पात्रता सीमा में है`,
        });
      } else {
        eligible = false;
        missingOrCheckReasons.push({
          matched: false,
          type: 'age',
          text: `Age criteria: ${scheme.minAge ?? 0} to ${scheme.maxAge ?? 'No limit'} years`,
          textHi: `आयु सीमा: ${scheme.minAge ?? 0} से ${scheme.maxAge ?? 'कोई सीमा नहीं'} वर्ष`,
        });
      }
    }

    // 6. Current Situation / Employment
    if (scheme.allowedEmploymentStatuses && scheme.allowedEmploymentStatuses.length > 0) {
      if (profile.employmentStatus) {
        if (scheme.allowedEmploymentStatuses.includes(profile.employmentStatus)) {
          score += 10;
          matchReasons.push({
            matched: true,
            type: 'situation',
            text: `Matches your current status as ${formatEmployment(profile.employmentStatus, 'en')}`,
            textHi: `आपकी वर्तमान स्थिति (${formatEmployment(profile.employmentStatus, 'hi')}) के अनुकूल`,
          });
        } else {
          eligible = false;
          missingOrCheckReasons.push({
            matched: false,
            type: 'situation',
            text: `Designed specifically for ${scheme.allowedEmploymentStatuses.map(s => formatEmployment(s, 'en')).join(' / ')}`,
            textHi: `विशेष रूप से ${scheme.allowedEmploymentStatuses.map(s => formatEmployment(s, 'hi')).join(' / ')} के लिए`,
          });
        }
      }
    }

    // 7. UDID Status Check
    if (profile.udidStatus === 'yes') {
      score += 5;
    } else if (profile.udidStatus === 'applied') {
      missingOrCheckReasons.push({
        matched: false,
        type: 'udid',
        text: 'UDID application in progress - Keep enrollment number ready',
        textHi: 'यूडीआईडी आवेदन प्रक्रिया में - नामांकन संख्या तैयार रखें',
      });
    } else {
      missingOrCheckReasons.push({
        matched: false,
        type: 'udid',
        text: 'UDID Card recommended to fast-track official processing',
        textHi: 'आवेदन में तेजी के लिए यूडीआईडी कार्ड बनवाने की सलाह दी जाती है',
      });
    }

    // 8. Determine Status
    let status: EligibilityStatus = 'check';
    if (eligible && !isPartial && score >= 60) {
      status = 'likely';
    } else if (eligible || score >= 40) {
      status = 'may_be';
    } else {
      status = 'check';
    }

    // Action Tips
    const actionTips: string[] = [];
    const actionTipsHi: string[] = [];

    if (profile.udidStatus !== 'yes') {
      actionTips.push('Apply for a UDID card online at swavlambancard.gov.in for faster approval.');
      actionTipsHi.push('त्वरित स्वीकृति हेतु swavlambancard.gov.in पर ऑनलाइन यूडीआईडी कार्ड के लिए आवेदन करें।');
    }
    if (scheme.documents.some(d => d.id === 'income_cert') && profile.annualIncome === null) {
      actionTips.push('Keep a fresh Tehsil income certificate (issued in last 6 months) ready.');
      actionTipsHi.push('तहसीलदार द्वारा जारी नवीन आय प्रमाण पत्र (पिछले 6 महीने का) तैयार रखें।');
    }
    if (scheme.applicationMode === 'online') {
      actionTips.push(`Submit application directly via ${scheme.officialPortalName}.`);
      actionTipsHi.push(`सीधे ${scheme.officialPortalNameHi} के माध्यम से ऑनलाइन आवेदन जमा करें।`);
    } else {
      actionTips.push(`Visit nearest ${scheme.offlineOffice || 'District Social Welfare Office'} with original documents.`);
      actionTipsHi.push(`मूल दस्तावेजों के साथ निकटतम ${scheme.offlineOfficeHi || 'जिला समाज कल्याण कार्यालय'} में संपर्क करें।`);
    }

    results.push({
      scheme,
      status,
      score: Math.min(100, Math.max(20, score)),
      matchReasons,
      missingOrCheckReasons,
      actionTips,
      actionTipsHi,
    });
  }

  // Sort: Likely first, then May Be, then Check, then by score descending
  const statusOrder: Record<EligibilityStatus, number> = {
    likely: 3,
    may_be: 2,
    check: 1,
  };

  return results.sort((a, b) => {
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[b.status] - statusOrder[a.status];
    }
    return b.score - a.score;
  });
}

function formatCategoryName(cat: string, lang: 'en' | 'hi'): string {
  const map: Record<string, { en: string; hi: string }> = {
    financial: { en: 'Financial Assistance', hi: 'वित्तीय सहायता' },
    healthcare: { en: 'Healthcare', hi: 'स्वास्थ्य सेवाएं' },
    assistive: { en: 'Assistive Devices', hi: 'सहायक उपकरण' },
    education: { en: 'Education', hi: 'शिक्षा' },
    employment: { en: 'Employment & Loans', hi: 'रोजगार व ऋण' },
    housing: { en: 'Housing', hi: 'आवास' },
    transport: { en: 'Transport & Travel', hi: 'परिवहन व यात्रा' },
    rehabilitation: { en: 'Rehabilitation', hi: 'पुनर्वास' },
    rights: { en: 'Legal Rights', hi: 'कानूनी अधिकार' },
    care: { en: 'Care & Support', hi: 'देखभाल व आश्रय' },
  };
  return map[cat] ? map[cat][lang] : cat;
}

function formatEmployment(status: string, lang: 'en' | 'hi'): string {
  const map: Record<string, { en: string; hi: string }> = {
    student: { en: 'Student', hi: 'विद्यार्थी' },
    employed: { en: 'Employed', hi: 'नौकरीपेशा' },
    unemployed: { en: 'Unemployed', hi: 'बेरोजगार' },
    self_employed: { en: 'Self-employed / Business', hi: 'स्वरोजगार / व्यवसायी' },
    retired: { en: 'Retired', hi: 'सेवानिवृत्त' },
    dependent: { en: 'Dependent on Family', hi: 'परिवार पर आश्रित' },
    homemaker: { en: 'Homemaker', hi: 'गृहिणी' },
    other: { en: 'Other', hi: 'अन्य' },
  };
  return map[status] ? map[status][lang] : status;
}
