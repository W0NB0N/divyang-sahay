import React from 'react';
import { User, MapPin, Building2, Trees, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { INDIAN_STATES } from '../../data/states';

export const Step1Basic: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, updateProfile } = useBenefits();

  const selectedStateObj = INDIAN_STATES.find(s => s.code === userProfile.state);
  const districts = selectedStateObj ? selectedStateObj.districts : [];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Step Heading */}
      <div className="border-b border-warm-200 dark:border-stone-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
          {t('step1BasicTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('step1BasicDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Age Input */}
        <div>
          <label htmlFor="user-age" className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
            {t('labelAge')} <span className="text-terracotta-600">*</span>
          </label>
          <div className="relative">
            <input
              id="user-age"
              type="number"
              min="0"
              max="120"
              value={userProfile.age ?? ''}
              onChange={(e) => {
                const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                updateProfile({ age: val });
              }}
              placeholder={t('labelAgePlaceholder')}
              className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-warm-300 dark:border-stone-700 text-stone-900 dark:text-white shadow-warm-sm focus:outline-none focus:ring-3 focus:ring-terracotta-500 font-medium"
            />
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5">
            {language === 'hi' ? 'उदाहरण: छात्रवृत्ति (14-25 वर्ष), पेंशन (18+ वर्ष)' : 'e.g., Scholarships (14-25), Adult pensions (18+)'}
          </p>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
            {t('labelGender')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'male', label: t('genderMale') },
              { id: 'female', label: t('genderFemale') },
              { id: 'other', label: t('genderOther') },
              { id: 'prefer_not_to_say', label: t('genderPreferNot') },
            ].map(g => (
              <button
                key={g.id}
                type="button"
                onClick={() => updateProfile({ gender: g.id as any })}
                className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  userProfile.gender === g.id
                    ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 shadow-warm-sm ring-2 ring-terracotta-500/20'
                    : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
                }`}
                aria-pressed={userProfile.gender === g.id}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* State Selection */}
        <div>
          <label htmlFor="user-state" className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
            {t('labelState')} <span className="text-terracotta-600">*</span>
          </label>
          <select
            id="user-state"
            value={userProfile.state}
            onChange={(e) => {
              const newState = e.target.value;
              const newStObj = INDIAN_STATES.find(s => s.code === newState);
              updateProfile({
                state: newState,
                district: newStObj && newStObj.districts.length > 0 ? newStObj.districts[0] : '',
              });
            }}
            className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-warm-300 dark:border-stone-700 text-stone-900 dark:text-white shadow-warm-sm focus:outline-none focus:ring-3 focus:ring-terracotta-500 font-medium"
          >
            {INDIAN_STATES.map(st => (
              <option key={st.code} value={st.code}>
                {language === 'hi' ? st.nameHi : st.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div>
          <label htmlFor="user-district" className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
            {t('labelDistrict')}
          </label>
          <select
            id="user-district"
            value={userProfile.district}
            onChange={(e) => updateProfile({ district: e.target.value })}
            className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-stone-800 border border-warm-300 dark:border-stone-700 text-stone-900 dark:text-white shadow-warm-sm focus:outline-none focus:ring-3 focus:ring-terracotta-500 font-medium"
          >
            <option value="">-- {t('selectDistrict')} --</option>
            {districts.map(dist => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Area Type (Rural / Urban) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
            {t('labelArea')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateProfile({ areaType: 'rural' })}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                userProfile.areaType === 'rural'
                  ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm'
                  : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
              }`}
              aria-pressed={userProfile.areaType === 'rural'}
            >
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm block">{t('areaRural')}</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'hi' ? 'ग्राम पंचायत, ब्लॉक विकास कार्यालय (BDO)' : 'Gram Panchayat, BDO Office'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => updateProfile({ areaType: 'urban' })}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                userProfile.areaType === 'urban'
                  ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm'
                  : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
              }`}
              aria-pressed={userProfile.areaType === 'urban'}
            >
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm block">{t('areaUrban')}</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'hi' ? 'नगर निगम, नगरपालिका, वार्ड कार्यालय' : 'Municipal Corporation, Ward Office'}
                </span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
