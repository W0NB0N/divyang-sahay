export interface StateData {
  code: string;
  name: string;
  nameHi: string;
  districts: string[];
}

export const INDIAN_STATES: StateData[] = [
  {
    code: 'AN',
    name: 'Andaman and Nicobar Islands',
    nameHi: 'अंडमान और निकोबार द्वीप समूह',
    districts: ['Nicobars', 'North and Middle Andaman', 'South Andaman'],
  },
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    nameHi: 'आंध्र प्रदेश',
    districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  },
  {
    code: 'AR',
    name: 'Arunachal Pradesh',
    nameHi: 'अरुणाचल प्रदेश',
    districts: ['Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Itanagar', 'Papum Pare', 'Tawang'],
  },
  {
    code: 'AS',
    name: 'Assam',
    nameHi: 'असम',
    districts: ['Baksa', 'Barpeta', 'Cachar', 'Dibrugarh', 'Guwahati (Kamrup Metro)', 'Jorhat', 'Nagaon', 'Silchar', 'Sonitpur', 'Tinsukia'],
  },
  {
    code: 'BR',
    name: 'Bihar',
    nameHi: 'बिहार',
    districts: ['Arrah', 'Bhagalpur', 'Darbhanga', 'Gaya', 'Muzaffarpur', 'Nalanda', 'Patna', 'Purnia', 'Rohtas', 'Vaishali'],
  },
  {
    code: 'CH',
    name: 'Chandigarh',
    nameHi: 'चंडीगढ़',
    districts: ['Chandigarh'],
  },
  {
    code: 'CT',
    name: 'Chhattisgarh',
    nameHi: 'छत्तीसगढ़',
    districts: ['Bastar', 'Bilaspur', 'Durg', 'Korba', 'Raigarh', 'Raipur', 'Rajnandgaon'],
  },
  {
    code: 'DL',
    name: 'Delhi (NCT)',
    nameHi: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)',
    districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  },
  {
    code: 'GA',
    name: 'Goa',
    nameHi: 'गोवा',
    districts: ['North Goa', 'South Goa'],
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    nameHi: 'गुजरात',
    districts: ['Ahmedabad', 'Amreli', 'Anand', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Rajkot', 'Surat', 'Vadodara'],
  },
  {
    code: 'HR',
    name: 'Haryana',
    nameHi: 'हरियाणा',
    districts: ['Ambala', 'Faridabad', 'Gurugram', 'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Sonipat', 'Yamunanagar'],
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    nameHi: 'हिमाचल प्रदेश',
    districts: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Shimla', 'Solan', 'Una'],
  },
  {
    code: 'JK',
    name: 'Jammu and Kashmir',
    nameHi: 'जम्मू और कश्मीर',
    districts: ['Anantnag', 'Baramulla', 'Budgam', 'Jammu', 'Kathua', 'Pulwama', 'Srinagar', 'Udhampur'],
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    nameHi: 'झारखंड',
    districts: ['Bokaro', 'Deoghar', 'Dhanbad', 'East Singhbhum (Jamshedpur)', 'Hazaribagh', 'Ranchi', 'Ranchi Rural'],
  },
  {
    code: 'KA',
    name: 'Karnataka',
    nameHi: 'कर्नाटक',
    districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Belagavi', 'Bellary', 'Dakshina Kannada (Mangaluru)', 'Dharwad', 'Kalaburagi', 'Mysuru', 'Shivamogga', 'Tumakuru', 'Udupi'],
  },
  {
    code: 'KL',
    name: 'Kerala',
    nameHi: 'केरल',
    districts: ['Alappuzha', 'Ernakulam (Kochi)', 'Idukki', 'Kannur', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thiruvananthapuram', 'Thrissur'],
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    nameHi: 'मध्य प्रदेश',
    districts: ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Rewa', 'Sagar', 'Satna', 'Ujjain'],
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    nameHi: 'महाराष्ट्र',
    districts: ['Ahmednagar', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Kolhapur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nashik', 'Pune', 'Solapur', 'Thane'],
  },
  {
    code: 'OD',
    name: 'Odisha',
    nameHi: 'ओडिशा',
    districts: ['Balasore', 'Berhampur', 'Bhadrak', 'Bhubaneswar (Khurda)', 'Cuttack', 'Ganjam', 'Puri', 'Rourkela (Sundargarh)', 'Sambalpur'],
  },
  {
    code: 'PB',
    name: 'Punjab',
    nameHi: 'पंजाब',
    districts: ['Amritsar', 'Bathinda', 'Jalandhar', 'Ludhiana', 'Mohali (SAS Nagar)', 'Patiala'],
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    nameHi: 'राजस्थान',
    districts: ['Ajmer', 'Alwar', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    nameHi: 'तमिलनाडु',
    districts: ['Chennai', 'Coimbatore', 'Cuddalore', 'Madurai', 'Salem', 'Thanjavur', 'Tiruchirappalli', 'Tirunelveli', 'Vellore'],
  },
  {
    code: 'TG',
    name: 'Telangana',
    nameHi: 'तेलंगाना',
    districts: ['Hyderabad', 'Karimnagar', 'Khammam', 'Medchal-Malkajgiri', 'Nizamabad', 'Rangareddy', 'Warangal'],
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    nameHi: 'उत्तर प्रदेश',
    districts: ['Agra', 'Aligarh', 'Ayodhya', 'Bareilly', 'Ghaziabad', 'Gorakhpur', 'Kanpur Nagar', 'Lucknow', 'Meerut', 'Noida (Gautam Buddha Nagar)', 'Prayagraj (Allahabad)', 'Varanasi'],
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    nameHi: 'उत्तराखंड',
    districts: ['Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Udham Singh Nagar'],
  },
  {
    code: 'WB',
    name: 'West Bengal',
    nameHi: 'पश्चिम बंगाल',
    districts: ['Asansol', 'Darjeeling', 'Hooghly', 'Howrah', 'Kolkata', 'North 24 Parganas', 'Siliguri', 'South 24 Parganas'],
  },
];
