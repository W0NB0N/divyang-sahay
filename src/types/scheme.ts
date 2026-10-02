export type DisabilityType =
  | 'locomotor'
  | 'visual_blindness'
  | 'visual_low_vision'
  | 'hearing_deaf'
  | 'hearing_hard'
  | 'speech_language'
  | 'intellectual'
  | 'specific_learning'
  | 'autism'
  | 'mental_illness'
  | 'cerebral_palsy'
  | 'muscular_dystrophy'
  | 'chronic_neurological'
  | 'multiple_sclerosis'
  | 'thalassemia'
  | 'hemophilia'
  | 'sickle_cell'
  | 'acid_attack'
  | 'parkinsons'
  | 'multiple_disabilities'
  | 'any';

export type NeedCategory =
  | 'financial'
  | 'healthcare'
  | 'assistive'
  | 'education'
  | 'employment'
  | 'housing'
  | 'transport'
  | 'rehabilitation'
  | 'rights'
  | 'care';

export type EligibilityStatus = 'likely' | 'may_be' | 'check';

export type GovernmentLevel = 'central' | 'state' | 'both';

export type EmploymentStatus =
  | 'student'
  | 'employed'
  | 'unemployed'
  | 'self_employed'
  | 'retired'
  | 'dependent'
  | 'homemaker'
  | 'other';

export type UDIDStatus = 'yes' | 'applied' | 'no';

export type BenchmarkStatus = 'yes' | 'no' | 'dont_know';

export interface UserProfile {
  // Step 1: Basic
  age: number | null;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | '';
  state: string;
  district: string;
  areaType: 'rural' | 'urban' | '';

  // Step 2: Disability
  disabilityTypes: DisabilityType[];
  disabilityPercentage: number | null; // 0 - 100
  isBenchmark: BenchmarkStatus;
  udidStatus: UDIDStatus;

  // Step 3: Financial
  annualIncome: number | null; // In INR
  isBPL: boolean | null;
  hasRationCard: boolean;

  // Step 4: Current Situation
  employmentStatus: EmploymentStatus | '';
  educationLevel?: string;

  // Step 5: Needs
  needs: NeedCategory[];
}

export interface DocumentRequirement {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  isMandatory: boolean;
  sampleLink?: string;
  howToGet?: string;
  howToGetHi?: string;
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  category: NeedCategory;
  level: GovernmentLevel;
  state?: string; // If state specific
  ministry: string;
  ministryHi: string;
  icon: string;
  badgeColor?: string;

  // Description & Details
  description: string;
  descriptionHi: string;
  benefits: string[];
  benefitsHi: string[];
  financialBenefitAmount?: string;
  financialBenefitAmountHi?: string;

  // Eligibility Rules
  minAge?: number;
  maxAge?: number;
  genderAllowed?: ('male' | 'female' | 'other')[];
  minDisabilityPercentage?: number;
  applicableDisabilities: DisabilityType[]; // 'any' means all RPwD categories
  maxAnnualIncome?: number; // In INR, null if no limit
  requiresBPL?: boolean;
  requiresUDID?: boolean;
  requiresBenchmark?: boolean; // 40%+
  allowedEmploymentStatuses?: EmploymentStatus[];
  applicableStates?: string[]; // Empty means all India

  // Documents
  documents: DocumentRequirement[];

  // How to Apply
  applicationSteps: string[];
  applicationStepsHi: string[];
  applicationMode: 'online' | 'offline' | 'both';
  officialPortalUrl: string;
  officialPortalName: string;
  officialPortalNameHi: string;
  helpline?: string;
  offlineOffice?: string;
  offlineOfficeHi?: string;

  // Additional Metadata
  keyHighlights: string[];
  keyHighlightsHi: string[];
  officialSourceText: string;
  officialSourceTextHi: string;
  popular?: boolean;
}

export interface MatchReason {
  matched: boolean;
  text: string;
  textHi: string;
  type: 'disability' | 'income' | 'age' | 'need' | 'bpl' | 'state' | 'udid' | 'situation';
}

export interface SchemeMatchResult {
  scheme: Scheme;
  status: EligibilityStatus;
  score: number; // 0 to 100
  matchReasons: MatchReason[];
  missingOrCheckReasons: MatchReason[];
  actionTips: string[];
  actionTipsHi: string[];
}

export interface SavedSchemeItem {
  schemeId: string;
  savedAt: string;
  applicationStage: 'checked' | 'documents_ready' | 'applied' | 'received';
  notes: string;
  checkedDocuments: string[]; // document ids
}

export type TextSize = 'normal' | 'large' | 'xlarge';
export type ContrastMode = 'editorial' | 'high-dark' | 'high-light' | 'sepia';
export type Language = 'en' | 'hi';
