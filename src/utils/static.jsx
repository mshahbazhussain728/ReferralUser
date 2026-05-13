// import { BloggerIcon } from "../assets/svgs/components/blogger-icon";
// import { FacebookIcon } from "../assets/svgs/components/facebook-icon";
// import { InstagramIcon } from "../assets/svgs/components/instagram-icon";
// import { RedditIcon } from "../assets/svgs/components/reddit-icon";
// import { TelegramIcon } from "../assets/svgs/components/telegram-icon";
// import { TumblrIcon } from "../assets/svgs/components/tumblr";
// import { TwitterIcon } from "../assets/svgs/components/twitter-icon";
// import { WhatsappIcon } from "../assets/svgs/components/whatsapp-icon";

// export const sideBar = [
//   {
//     icon: "Dashboard",
//     title: "Dashboard",
//     pathname: "/dashboard",
//     query: "ref-guide",
//     queryName: "status",
//     role: [0],
//     inner: [
//       {
//         title: "Referral Guide",
//         pathname: "/dashboard",
//         query: "ref-guide",
//       },
//       {
//         title: "View Results",
//         pathname: "/dashboard",
//         query: "results",
//       },
//     ],
//   },
//   {
//     icon: "Users",
//     title: "Free Users Listing",
//     pathname: "/free-users",
//     role: [0],
//   },
//   {
//     icon: "MonthlyPrem",
//     title: "Monthly Premium",
//     pathname: "/monthly-premium-users",
//     query: "None",
//     queryName: "status",
//     role: [0],
//     inner: [
//       {
//         title: "Monthly Trial",
//         pathname: "/monthly-premium-users",
//         query: "trial",
//       },
//       {
//         title: "Monthly Subscribed",
//         pathname: "/monthly-premium-users",
//         query: "subscribed",
//       },
//       {
//         title: "Monthly Cancelled",
//         pathname: "/monthly-premium-users",
//         query: "cancelled",
//       },
//     ],
//   },
//   {
//     icon: "YearlyPrem",
//     title: "Yearly Premium",
//     pathname: "/yearly-premium-users",
//     query: "None",
//     queryName: "status",
//     role: [0],
//     inner: [
//       {
//         title: "Yearly Trial",
//         pathname: "/yearly-premium-users",
//         query: "trial",
//       },
//       {
//         title: "Yearly Subscribed",
//         pathname: "/yearly-premium-users",
//         query: "subscribed",
//       },
//       {
//         title: "Yearly Cancelled",
//         pathname: "/yearly-premium-users",
//         query: "cancelled",
//       },
//     ],
//   },
//   {
//     icon: "MyRewards",
//     title: "My Reward",
//     pathname: "/my-rewards",
//     role: [0],
//   },
//   {
//     icon: "RequestRedeem",
//     title: "Request Redeem",
//     pathname: "/request-redeem",
//     role: [0],
//   },
//   {
//     icon: "Point",
//     title: "Point History",
//     pathname: "/point-history",
//     role: [0],
//   },
//   {
//     icon: "Coupon",
//     title: "Coupon History",
//     pathname: "/coupon-history",
//     role: [0],
//   },
//   {
//     icon: "RedeemHistory",
//     title: "Redeemed History",
//     pathname: "/redeem-history",
//     role: [0],
//   },
// ];

// export const staticEnums = {
//   User: {
//     role: {
//       Admin: 0,
//       Company: 1,
//       Employee: 2,
//       Agent: 3,
//     },

//     oAuthIds: {
//       google: "google",
//       facebook: "facebook",
//       apple: "apple",
//     },
//     idVerificationStatus: {
//       notSubmitted: 0,
//       submittedProcessing: 1,
//       approved: 2,
//       rejected: 3,
//     },
//   },
//   OTP: {
//     purpose: {
//       resetPwd: 0,
//       emailVerification: 1,
//       phoneVerification: 2,
//     },
//   },
// };

// export const Field = {
//   input: "input",
//   password: "password",
//   select: "select",
//   phone: "phone",
//   date: "date",
//   checkbox: "checkbox",
//   radio: "radio",
//   span: "span",
//   div: "div",
//   button: "button",
//   profileUploadField: "profileUploadField",
//   otpField: "otpField",
// };

// export const AuthScreens = {
//   LANDING: "LANDING",
//   PROFILE_CREATION: "PROFILE_CREATION",
//   NUMBER_STAGE: "NUMBER_STAGE",
//   PHONE_VERIFICATION: "PHONE_VERIFICATION",
// };

// export const countries = [
//   {
//     label: "Aruba",
//     value: "Aruba",
//   },
//   {
//     label: "Afghanistan",
//     value: "Afghanistan",
//   },
//   {
//     label: "Angola",
//     value: "Angola",
//   },
//   {
//     label: "Anguilla",
//     value: "Anguilla",
//   },
//   {
//     label: "\u00c5land Islands",
//     value: "\u00c5land Islands",
//   },
//   {
//     label: "Albania",
//     value: "Albania",
//   },
//   {
//     label: "Andorra",
//     value: "Andorra",
//   },
//   {
//     label: "United Arab Emirates",
//     value: "United Arab Emirates",
//   },
//   {
//     label: "Argentina",
//     value: "Argentina",
//   },
//   {
//     label: "Armenia",
//     value: "Armenia",
//   },
//   {
//     label: "American Samoa",
//     value: "American Samoa",
//   },
//   {
//     label: "Antarctica",
//     value: "Antarctica",
//   },
//   {
//     label: "French Southern Territories",
//     value: "French Southern Territories",
//   },
//   {
//     label: "Antigua and Barbuda",
//     value: "Antigua and Barbuda",
//   },
//   {
//     label: "Australia",
//     value: "Australia",
//   },
//   {
//     label: "Austria",
//     value: "Austria",
//   },
//   {
//     label: "Azerbaijan",
//     value: "Azerbaijan",
//   },
//   {
//     label: "Burundi",
//     value: "Burundi",
//   },
//   {
//     label: "Belgium",
//     value: "Belgium",
//   },
//   {
//     label: "Benin",
//     value: "Benin",
//   },
//   {
//     label: "Bonaire, Sint Eustatius and Saba",
//     value: "Bonaire, Sint Eustatius and Saba",
//   },
//   {
//     label: "Burkina Faso",
//     value: "Burkina Faso",
//   },
//   {
//     label: "Bangladesh",
//     value: "Bangladesh",
//   },
//   {
//     label: "Bulgaria",
//     value: "Bulgaria",
//   },
//   {
//     label: "Bahrain",
//     value: "Bahrain",
//   },
//   {
//     label: "Bahamas",
//     value: "Bahamas",
//   },
//   {
//     label: "Bosnia and Herzegovina",
//     value: "Bosnia and Herzegovina",
//   },
//   {
//     label: "Saint Barth\u00e9lemy",
//     value: "Saint Barth\u00e9lemy",
//   },
//   {
//     label: "Belarus",
//     value: "Belarus",
//   },
//   {
//     label: "Belize",
//     value: "Belize",
//   },
//   {
//     label: "Bermuda",
//     value: "Bermuda",
//   },
//   {
//     label: "Bolivia, Plurinational State of",
//     value: "Bolivia, Plurinational State of",
//   },
//   {
//     label: "Brazil",
//     value: "Brazil",
//   },
//   {
//     label: "Barbados",
//     value: "Barbados",
//   },
//   {
//     label: "Brunei Darussalam",
//     value: "Brunei Darussalam",
//   },
//   {
//     label: "Bhutan",
//     value: "Bhutan",
//   },
//   {
//     label: "Bouvet Island",
//     value: "Bouvet Island",
//   },
//   {
//     label: "Botswana",
//     value: "Botswana",
//   },
//   {
//     label: "Central African Republic",
//     value: "Central African Republic",
//   },
//   {
//     label: "Canada",
//     value: "Canada",
//   },
//   {
//     label: "Cocos (Keeling) Islands",
//     value: "Cocos (Keeling) Islands",
//   },
//   {
//     label: "Switzerland",
//     value: "Switzerland",
//   },
//   {
//     label: "Chile",
//     value: "Chile",
//   },
//   {
//     label: "China",
//     value: "China",
//   },
//   {
//     label: "C\u00f4te d'Ivoire",
//     value: "C\u00f4te d'Ivoire",
//   },
//   {
//     label: "Cameroon",
//     value: "Cameroon",
//   },
//   {
//     label: "Congo, The Democratic Republic of the",
//     value: "Congo, The Democratic Republic of the",
//   },
//   {
//     label: "Congo",
//     value: "Congo",
//   },
//   {
//     label: "Cook Islands",
//     value: "Cook Islands",
//   },
//   {
//     label: "Colombia",
//     value: "Colombia",
//   },
//   {
//     label: "Comoros",
//     value: "Comoros",
//   },
//   {
//     label: "Cabo Verde",
//     value: "Cabo Verde",
//   },
//   {
//     label: "Costa Rica",
//     value: "Costa Rica",
//   },
//   {
//     label: "Cuba",
//     value: "Cuba",
//   },
//   {
//     label: "Cura\u00e7ao",
//     value: "Cura\u00e7ao",
//   },
//   {
//     label: "Christmas Island",
//     value: "Christmas Island",
//   },
//   {
//     label: "Cayman Islands",
//     value: "Cayman Islands",
//   },
//   {
//     label: "Cyprus",
//     value: "Cyprus",
//   },
//   {
//     label: "Czechia",
//     value: "Czechia",
//   },
//   {
//     label: "Germany",
//     value: "Germany",
//   },
//   {
//     label: "Djibouti",
//     value: "Djibouti",
//   },
//   {
//     label: "Dominica",
//     value: "Dominica",
//   },
//   {
//     label: "Denmark",
//     value: "Denmark",
//   },
//   {
//     label: "Dominican Republic",
//     value: "Dominican Republic",
//   },
//   {
//     label: "Algeria",
//     value: "Algeria",
//   },
//   {
//     label: "Ecuador",
//     value: "Ecuador",
//   },
//   {
//     label: "Egypt",
//     value: "Egypt",
//   },
//   {
//     label: "Eritrea",
//     value: "Eritrea",
//   },
//   {
//     label: "Western Sahara",
//     value: "Western Sahara",
//   },
//   {
//     label: "Spain",
//     value: "Spain",
//   },
//   {
//     label: "Estonia",
//     value: "Estonia",
//   },
//   {
//     label: "Ethiopia",
//     value: "Ethiopia",
//   },
//   {
//     label: "Finland",
//     value: "Finland",
//   },
//   {
//     label: "Fiji",
//     value: "Fiji",
//   },
//   {
//     label: "Falkland Islands (Malvinas)",
//     value: "Falkland Islands (Malvinas)",
//   },
//   {
//     label: "France",
//     value: "France",
//   },
//   {
//     label: "Faroe Islands",
//     value: "Faroe Islands",
//   },
//   {
//     label: "Micronesia, Federated States of",
//     value: "Micronesia, Federated States of",
//   },
//   {
//     label: "Gabon",
//     value: "Gabon",
//   },
//   {
//     label: "United Kingdom",
//     value: "United Kingdom",
//   },
//   {
//     label: "Georgia",
//     value: "Georgia",
//   },
//   {
//     label: "Guernsey",
//     value: "Guernsey",
//   },
//   {
//     label: "Ghana",
//     value: "Ghana",
//   },
//   {
//     label: "Gibraltar",
//     value: "Gibraltar",
//   },
//   {
//     label: "Guinea",
//     value: "Guinea",
//   },
//   {
//     label: "Guadeloupe",
//     value: "Guadeloupe",
//   },
//   {
//     label: "Gambia",
//     value: "Gambia",
//   },
//   {
//     label: "Guinea-Bissau",
//     value: "Guinea-Bissau",
//   },
//   {
//     label: "Equatorial Guinea",
//     value: "Equatorial Guinea",
//   },
//   {
//     label: "Greece",
//     value: "Greece",
//   },
//   {
//     label: "Grenada",
//     value: "Grenada",
//   },
//   {
//     label: "Greenland",
//     value: "Greenland",
//   },
//   {
//     label: "Guatemala",
//     value: "Guatemala",
//   },
//   {
//     label: "French Guiana",
//     value: "French Guiana",
//   },
//   {
//     label: "Guam",
//     value: "Guam",
//   },
//   {
//     label: "Guyana",
//     value: "Guyana",
//   },
//   {
//     label: "Hong Kong",
//     value: "Hong Kong",
//   },
//   {
//     label: "Heard Island and McDonald Islands",
//     value: "Heard Island and McDonald Islands",
//   },
//   {
//     label: "Honduras",
//     value: "Honduras",
//   },
//   {
//     label: "Croatia",
//     value: "Croatia",
//   },
//   {
//     label: "Haiti",
//     value: "Haiti",
//   },
//   {
//     label: "Hungary",
//     value: "Hungary",
//   },
//   {
//     label: "Indonesia",
//     value: "Indonesia",
//   },
//   {
//     label: "Isle of Man",
//     value: "Isle of Man",
//   },
//   {
//     label: "India",
//     value: "India",
//   },
//   {
//     label: "British Indian Ocean Territory",
//     value: "British Indian Ocean Territory",
//   },
//   {
//     label: "Ireland",
//     value: "Ireland",
//   },
//   {
//     label: "Iran, Islamic Republic of",
//     value: "Iran, Islamic Republic of",
//   },
//   {
//     label: "Iraq",
//     value: "Iraq",
//   },
//   {
//     label: "Iceland",
//     value: "Iceland",
//   },
//   {
//     label: "Israel",
//     value: "Israel",
//   },
//   {
//     label: "Italy",
//     value: "Italy",
//   },
//   {
//     label: "Jamaica",
//     value: "Jamaica",
//   },
//   {
//     label: "Jersey",
//     value: "Jersey",
//   },
//   {
//     label: "Jordan",
//     value: "Jordan",
//   },
//   {
//     label: "Japan",
//     value: "Japan",
//   },
//   {
//     label: "Kazakhstan",
//     value: "Kazakhstan",
//   },
//   {
//     label: "Kenya",
//     value: "Kenya",
//   },
//   {
//     label: "Kyrgyzstan",
//     value: "Kyrgyzstan",
//   },
//   {
//     label: "Cambodia",
//     value: "Cambodia",
//   },
//   {
//     label: "Kiribati",
//     value: "Kiribati",
//   },
//   {
//     label: "Saint Kitts and Nevis",
//     value: "Saint Kitts and Nevis",
//   },
//   {
//     label: "Korea, Republic of",
//     value: "Korea, Republic of",
//   },
//   {
//     label: "Kuwait",
//     value: "Kuwait",
//   },
//   {
//     label: "Lao People's Democratic Republic",
//     value: "Lao People's Democratic Republic",
//   },
//   {
//     label: "Lebanon",
//     value: "Lebanon",
//   },
//   {
//     label: "Liberia",
//     value: "Liberia",
//   },
//   {
//     label: "Libya",
//     value: "Libya",
//   },
//   {
//     label: "Saint Lucia",
//     value: "Saint Lucia",
//   },
//   {
//     label: "Liechtenstein",
//     value: "Liechtenstein",
//   },
//   {
//     label: "Sri Lanka",
//     value: "Sri Lanka",
//   },
//   {
//     label: "Lesotho",
//     value: "Lesotho",
//   },
//   {
//     label: "Lithuania",
//     value: "Lithuania",
//   },
//   {
//     label: "Luxembourg",
//     value: "Luxembourg",
//   },
//   {
//     label: "Latvia",
//     value: "Latvia",
//   },
//   {
//     label: "Macao",
//     value: "Macao",
//   },
//   {
//     label: "Saint Martin (French part)",
//     value: "Saint Martin (French part)",
//   },
//   {
//     label: "Morocco",
//     value: "Morocco",
//   },
//   {
//     label: "Monaco",
//     value: "Monaco",
//   },
//   {
//     label: "Moldova, Republic of",
//     value: "Moldova, Republic of",
//   },
//   {
//     label: "Madagascar",
//     value: "Madagascar",
//   },
//   {
//     label: "Maldives",
//     value: "Maldives",
//   },
//   {
//     label: "Mexico",
//     value: "Mexico",
//   },
//   {
//     label: "Marshall Islands",
//     value: "Marshall Islands",
//   },
//   {
//     label: "North Macedonia",
//     value: "North Macedonia",
//   },
//   {
//     label: "Mali",
//     value: "Mali",
//   },
//   {
//     label: "Malta",
//     value: "Malta",
//   },
//   {
//     label: "Myanmar",
//     value: "Myanmar",
//   },
//   {
//     label: "Montenegro",
//     value: "Montenegro",
//   },
//   {
//     label: "Mongolia",
//     value: "Mongolia",
//   },
//   {
//     label: "Northern Mariana Islands",
//     value: "Northern Mariana Islands",
//   },
//   {
//     label: "Mozambique",
//     value: "Mozambique",
//   },
//   {
//     label: "Mauritania",
//     value: "Mauritania",
//   },
//   {
//     label: "Montserrat",
//     value: "Montserrat",
//   },
//   {
//     label: "Martinique",
//     value: "Martinique",
//   },
//   {
//     label: "Mauritius",
//     value: "Mauritius",
//   },
//   {
//     label: "Malawi",
//     value: "Malawi",
//   },
//   {
//     label: "Malaysia",
//     value: "Malaysia",
//   },
//   {
//     label: "Mayotte",
//     value: "Mayotte",
//   },
//   {
//     label: "Namibia",
//     value: "Namibia",
//   },
//   {
//     label: "New Caledonia",
//     value: "New Caledonia",
//   },
//   {
//     label: "Niger",
//     value: "Niger",
//   },
//   {
//     label: "Norfolk Island",
//     value: "Norfolk Island",
//   },
//   {
//     label: "Nigeria",
//     value: "Nigeria",
//   },
//   {
//     label: "Nicaragua",
//     value: "Nicaragua",
//   },
//   {
//     label: "Niue",
//     value: "Niue",
//   },
//   {
//     label: "Netherlands",
//     value: "Netherlands",
//   },
//   {
//     label: "Norway",
//     value: "Norway",
//   },
//   {
//     label: "Nepal",
//     value: "Nepal",
//   },
//   {
//     label: "Nauru",
//     value: "Nauru",
//   },
//   {
//     label: "New Zealand",
//     value: "New Zealand",
//   },
//   {
//     label: "Oman",
//     value: "Oman",
//   },
//   {
//     label: "Pakistan",
//     value: "Pakistan",
//   },
//   {
//     label: "Panama",
//     value: "Panama",
//   },
//   {
//     label: "Pitcairn",
//     value: "Pitcairn",
//   },
//   {
//     label: "Peru",
//     value: "Peru",
//   },
//   {
//     label: "Philippines",
//     value: "Philippines",
//   },
//   {
//     label: "Palau",
//     value: "Palau",
//   },
//   {
//     label: "Papua New Guinea",
//     value: "Papua New Guinea",
//   },
//   {
//     label: "Poland",
//     value: "Poland",
//   },
//   {
//     label: "Puerto Rico",
//     value: "Puerto Rico",
//   },
//   {
//     label: "Korea, Democratic People's Republic of",
//     value: "Korea, Democratic People's Republic of",
//   },
//   {
//     label: "Portugal",
//     value: "Portugal",
//   },
//   {
//     label: "Paraguay",
//     value: "Paraguay",
//   },
//   {
//     label: "Palestine, State of",
//     value: "Palestine, State of",
//   },
//   {
//     label: "French Polynesia",
//     value: "French Polynesia",
//   },
//   {
//     label: "Qatar",
//     value: "Qatar",
//   },
//   {
//     label: "R\u00e9union",
//     value: "R\u00e9union",
//   },
//   {
//     label: "Romania",
//     value: "Romania",
//   },
//   {
//     label: "Russian Federation",
//     value: "Russian Federation",
//   },
//   {
//     label: "Rwanda",
//     value: "Rwanda",
//   },
//   {
//     label: "Saudi Arabia",
//     value: "Saudi Arabia",
//   },
//   {
//     label: "Sudan",
//     value: "Sudan",
//   },
//   {
//     label: "Senegal",
//     value: "Senegal",
//   },
//   {
//     label: "Singapore",
//     value: "Singapore",
//   },
//   {
//     label: "South Georgia and the South Sandwich Islands",
//     value: "South Georgia and the South Sandwich Islands",
//   },
//   {
//     label: "Saint Helena, Ascension and Tristan da Cunha",
//     value: "Saint Helena, Ascension and Tristan da Cunha",
//   },
//   {
//     label: "Svalbard and Jan Mayen",
//     value: "Svalbard and Jan Mayen",
//   },
//   {
//     label: "Solomon Islands",
//     value: "Solomon Islands",
//   },
//   {
//     label: "Sierra Leone",
//     value: "Sierra Leone",
//   },
//   {
//     label: "El Salvador",
//     value: "El Salvador",
//   },
//   {
//     label: "San Marino",
//     value: "San Marino",
//   },
//   {
//     label: "Somalia",
//     value: "Somalia",
//   },
//   {
//     label: "Saint Pierre and Miquelon",
//     value: "Saint Pierre and Miquelon",
//   },
//   {
//     label: "Serbia",
//     value: "Serbia",
//   },
//   {
//     label: "South Sudan",
//     value: "South Sudan",
//   },
//   {
//     label: "Sao Tome and Principe",
//     value: "Sao Tome and Principe",
//   },
//   {
//     label: "Suriname",
//     value: "Suriname",
//   },
//   {
//     label: "Slovakia",
//     value: "Slovakia",
//   },
//   {
//     label: "Slovenia",
//     value: "Slovenia",
//   },
//   {
//     label: "Sweden",
//     value: "Sweden",
//   },
//   {
//     label: "Eswatini",
//     value: "Eswatini",
//   },
//   {
//     label: "Sint Maarten (Dutch part)",
//     value: "Sint Maarten (Dutch part)",
//   },
//   {
//     label: "Seychelles",
//     value: "Seychelles",
//   },
//   {
//     label: "Syrian Arab Republic",
//     value: "Syrian Arab Republic",
//   },
//   {
//     label: "Turks and Caicos Islands",
//     value: "Turks and Caicos Islands",
//   },
//   {
//     label: "Chad",
//     value: "Chad",
//   },
//   {
//     label: "Togo",
//     value: "Togo",
//   },
//   {
//     label: "Thailand",
//     value: "Thailand",
//   },
//   {
//     label: "Tajikistan",
//     value: "Tajikistan",
//   },
//   {
//     label: "Tokelau",
//     value: "Tokelau",
//   },
//   {
//     label: "Turkmenistan",
//     value: "Turkmenistan",
//   },
//   {
//     label: "Timor-Leste",
//     value: "Timor-Leste",
//   },
//   {
//     label: "Tonga",
//     value: "Tonga",
//   },
//   {
//     label: "Trinidad and Tobago",
//     value: "Trinidad and Tobago",
//   },
//   {
//     label: "Tunisia",
//     value: "Tunisia",
//   },
//   {
//     label: "Turkey",
//     value: "Turkey",
//   },
//   {
//     label: "Tuvalu",
//     value: "Tuvalu",
//   },
//   {
//     label: "Taiwan, Province of China",
//     value: "Taiwan, Province of China",
//   },
//   {
//     label: "Tanzania, United Republic of",
//     value: "Tanzania, United Republic of",
//   },
//   {
//     label: "Uganda",
//     value: "Uganda",
//   },
//   {
//     label: "Ukraine",
//     value: "Ukraine",
//   },
//   {
//     label: "United States Minor Outlying Islands",
//     value: "United States Minor Outlying Islands",
//   },
//   {
//     label: "Uruguay",
//     value: "Uruguay",
//   },
//   {
//     label: "United States",
//     value: "United States",
//   },
//   {
//     label: "Uzbekistan",
//     value: "Uzbekistan",
//   },
//   {
//     label: "Holy See (Vatican City State)",
//     value: "Holy See (Vatican City State)",
//   },
//   {
//     label: "Saint Vincent and the Grenadines",
//     value: "Saint Vincent and the Grenadines",
//   },
//   {
//     label: "Venezuela, Bolivarian Republic of",
//     value: "Venezuela, Bolivarian Republic of",
//   },
//   {
//     label: "Virgin Islands, British",
//     value: "Virgin Islands, British",
//   },
//   {
//     label: "Virgin Islands, U.S.",
//     value: "Virgin Islands, U.S.",
//   },
//   {
//     label: "Viet Nam",
//     value: "Viet Nam",
//   },
//   {
//     label: "Vanuatu",
//     value: "Vanuatu",
//   },
//   {
//     label: "Wallis and Futuna",
//     value: "Wallis and Futuna",
//   },
//   {
//     label: "Samoa",
//     value: "Samoa",
//   },
//   {
//     label: "Yemen",
//     value: "Yemen",
//   },
//   {
//     label: "South Africa",
//     value: "South Africa",
//   },
//   {
//     label: "Zambia",
//     value: "Zambia",
//   },
//   {
//     label: "Zimbabwe",
//     value: "Zimbabwe",
//   },
// ];

// export const shareLinks = [
//   {
//     label: "Facebook",
//     icon: <FacebookIcon />,
//     url: "https://www.facebook.com",
//   },

//   {
//     label: "Twitter",
//     icon: <TwitterIcon />,
//     url: "https://twitter.com",
//   },
//   {
//     label: "Blogger",
//     icon: <BloggerIcon />,
//     url: "https://www.blogger.com",
//   },
//   {
//     label: "Reddit",
//     icon: <RedditIcon />,
//     url: "https://www.reddit.com",
//   },
//   {
//     label: "Tumblr",
//     icon: <TumblrIcon />,
//     url: "https://www.tumblr.com/",
//   },

//   {
//     label: "WhatsApp",
//     icon: <WhatsappIcon />,
//     url: "https://www.whatsapp.com/",
//   },
//   {
//     label: "Telegram",
//     icon: <TelegramIcon />,
//     url: "https://telegram.org/",
//   },
//   {
//     label: "Instagram",
//     icon: <InstagramIcon />,
//     url: "https://www.instagram.com/",
//   },
// ];

// export const FiltersDefaultValues = Object.freeze({
//   None: "None",
// });









import { BloggerIcon } from "../assets/svgs/components/blogger-icon";
import { FacebookIcon } from "../assets/svgs/components/facebook-icon";
import { InstagramIcon } from "../assets/svgs/components/instagram-icon";
import { RedditIcon } from "../assets/svgs/components/reddit-icon";
import { TelegramIcon } from "../assets/svgs/components/telegram-icon";
import { TumblrIcon } from "../assets/svgs/components/tumblr";
import { TwitterIcon } from "../assets/svgs/components/twitter-icon";
import { WhatsappIcon } from "../assets/svgs/components/whatsapp-icon";

export const sideBar = [
  {
    icon: "Dashboard",
    title: "Dashboard",
    pathname: "/dashboard",
    query: "ref-guide",
    queryName: "status",
    role: [0],
    inner: [
      {
        title: "Referral Guide",
        pathname: "/dashboard",
        query: "ref-guide",
      },
      {
        title: "View Results",
        pathname: "/dashboard",
        query: "results",
      },
    ],
  },
  {
    icon: "Users",
    title: "Free Users Listing",
    pathname: "/free-users",
    role: [0],
  },
  {
    icon: "MonthlyPrem",
    title: "Monthly Premium",
    // No pathname — clicking parent only toggles submenu, does NOT navigate
    role: [0],
    inner: [
      {
        title: "Monthly Trial",
        pathname: "/monthly-premium-users",
        query: "trial",
      },
      {
        title: "Monthly Subscribed",
        pathname: "/monthly-premium-users",
        query: "subscribed",
      },
      {
        title: "Monthly Cancelled",
        pathname: "/monthly-premium-users",
        query: "cancelled",
      },

        {
        title: "Monthly Expired",
        pathname: "/monthly-premium-users",
        query: "expired",
      },
        {
        title: "Monthly Refund",
        pathname: "/monthly-premium-users",
        query: "refund",
      },
    ],
  },
  {
    icon: "YearlyPrem",
    title: "Yearly Premium",
    // No pathname — clicking parent only toggles submenu, does NOT navigate
    role: [0],
    inner: [
      {
        title: "Yearly Trial",
        pathname: "/yearly-premium-users",
        query: "trial",
      },
      {
        title: "Yearly Subscribed",
        pathname: "/yearly-premium-users",
        query: "subscribed",
      },
      {
        title: "Yearly Cancelled",
        pathname: "/yearly-premium-users",
        query: "cancelled",
      },
       {
        title: "Yearly Expired",
        pathname: "/yearly-premium-users",
        query: "expired",
      },
       {
        title: "Yearly Refund",
        pathname: "/yearly-premium-users",
        query: "refund",
      },
    ],
  },
  {
    icon: "MyRewards",
    title: "My Reward",
    pathname: "/my-rewards",
    role: [0],
  },
  {
    icon: "RequestRedeem",
    title: "Request Redeem",
    pathname: "/request-redeem",
    role: [0],
  },
  {
    icon: "Point",
    title: "Points History",
    pathname: "/point-history",
    role: [0],
  },
  {
    icon: "Coupon",
    title: "Coupon History",
    pathname: "/coupon-history",
    role: [0],
  },
  {
    icon: "RedeemHistory",
    title: "Redeemed History",
    pathname: "/redeem-history",
    role: [0],
  },
];

export const staticEnums = {
  User: {
    role: {
      Admin: 0,
      Company: 1,
      Employee: 2,
      Agent: 3,
    },
    oAuthIds: {
      google: "google",
      facebook: "facebook",
      apple: "apple",
    },
    idVerificationStatus: {
      notSubmitted: 0,
      submittedProcessing: 1,
      approved: 2,
      rejected: 3,
    },
  },
  OTP: {
    purpose: {
      resetPwd: 0,
      emailVerification: 1,
      phoneVerification: 2,
    },
  },
};

export const Field = {
  input: "input",
  password: "password",
  select: "select",
  phone: "phone",
  date: "date",
  checkbox: "checkbox",
  radio: "radio",
  span: "span",
  div: "div",
  button: "button",
  profileUploadField: "profileUploadField",
  otpField: "otpField",
};

export const AuthScreens = {
  LANDING: "LANDING",
  PROFILE_CREATION: "PROFILE_CREATION",
  NUMBER_STAGE: "NUMBER_STAGE",
  PHONE_VERIFICATION: "PHONE_VERIFICATION",
};

export const countries = [
  { label: "Aruba", value: "Aruba" },
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Angola", value: "Angola" },
  { label: "Anguilla", value: "Anguilla" },
  { label: "\u00c5land Islands", value: "\u00c5land Islands" },
  { label: "Albania", value: "Albania" },
  { label: "Andorra", value: "Andorra" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "American Samoa", value: "American Samoa" },
  { label: "Antarctica", value: "Antarctica" },
  { label: "French Southern Territories", value: "French Southern Territories" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Burundi", value: "Burundi" },
  { label: "Belgium", value: "Belgium" },
  { label: "Benin", value: "Benin" },
  { label: "Bonaire, Sint Eustatius and Saba", value: "Bonaire, Sint Eustatius and Saba" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Saint Barth\u00e9lemy", value: "Saint Barth\u00e9lemy" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belize", value: "Belize" },
  { label: "Bermuda", value: "Bermuda" },
  { label: "Bolivia, Plurinational State of", value: "Bolivia, Plurinational State of" },
  { label: "Brazil", value: "Brazil" },
  { label: "Barbados", value: "Barbados" },
  { label: "Brunei Darussalam", value: "Brunei Darussalam" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bouvet Island", value: "Bouvet Island" },
  { label: "Botswana", value: "Botswana" },
  { label: "Central African Republic", value: "Central African Republic" },
  { label: "Canada", value: "Canada" },
  { label: "Cocos (Keeling) Islands", value: "Cocos (Keeling) Islands" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "C\u00f4te d'Ivoire", value: "C\u00f4te d'Ivoire" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Congo, The Democratic Republic of the", value: "Congo, The Democratic Republic of the" },
  { label: "Congo", value: "Congo" },
  { label: "Cook Islands", value: "Cook Islands" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cura\u00e7ao", value: "Cura\u00e7ao" },
  { label: "Christmas Island", value: "Christmas Island" },
  { label: "Cayman Islands", value: "Cayman Islands" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czechia", value: "Czechia" },
  { label: "Germany", value: "Germany" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Denmark", value: "Denmark" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Algeria", value: "Algeria" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Western Sahara", value: "Western Sahara" },
  { label: "Spain", value: "Spain" },
  { label: "Estonia", value: "Estonia" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Finland", value: "Finland" },
  { label: "Fiji", value: "Fiji" },
  { label: "Falkland Islands (Malvinas)", value: "Falkland Islands (Malvinas)" },
  { label: "France", value: "France" },
  { label: "Faroe Islands", value: "Faroe Islands" },
  { label: "Micronesia, Federated States of", value: "Micronesia, Federated States of" },
  { label: "Gabon", value: "Gabon" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Georgia", value: "Georgia" },
  { label: "Guernsey", value: "Guernsey" },
  { label: "Ghana", value: "Ghana" },
  { label: "Gibraltar", value: "Gibraltar" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guadeloupe", value: "Guadeloupe" },
  { label: "Gambia", value: "Gambia" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Greenland", value: "Greenland" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "French Guiana", value: "French Guiana" },
  { label: "Guam", value: "Guam" },
  { label: "Guyana", value: "Guyana" },
  { label: "Hong Kong", value: "Hong Kong" },
  { label: "Heard Island and McDonald Islands", value: "Heard Island and McDonald Islands" },
  { label: "Honduras", value: "Honduras" },
  { label: "Croatia", value: "Croatia" },
  { label: "Haiti", value: "Haiti" },
  { label: "Hungary", value: "Hungary" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Isle of Man", value: "Isle of Man" },
  { label: "India", value: "India" },
  { label: "British Indian Ocean Territory", value: "British Indian Ocean Territory" },
  { label: "Ireland", value: "Ireland" },
  { label: "Iran, Islamic Republic of", value: "Iran, Islamic Republic of" },
  { label: "Iraq", value: "Iraq" },
  { label: "Iceland", value: "Iceland" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Jersey", value: "Jersey" },
  { label: "Jordan", value: "Jordan" },
  { label: "Japan", value: "Japan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { label: "Korea, Republic of", value: "Korea, Republic of" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Lao People's Democratic Republic", value: "Lao People's Democratic Republic" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Saint Lucia", value: "Saint Lucia" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Latvia", value: "Latvia" },
  { label: "Macao", value: "Macao" },
  { label: "Saint Martin (French part)", value: "Saint Martin (French part)" },
  { label: "Morocco", value: "Morocco" },
  { label: "Monaco", value: "Monaco" },
  { label: "Moldova, Republic of", value: "Moldova, Republic of" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mexico", value: "Mexico" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Northern Mariana Islands", value: "Northern Mariana Islands" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Martinique", value: "Martinique" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Mayotte", value: "Mayotte" },
  { label: "Namibia", value: "Namibia" },
  { label: "New Caledonia", value: "New Caledonia" },
  { label: "Niger", value: "Niger" },
  { label: "Norfolk Island", value: "Norfolk Island" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niue", value: "Niue" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "Norway", value: "Norway" },
  { label: "Nepal", value: "Nepal" },
  { label: "Nauru", value: "Nauru" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Panama", value: "Panama" },
  { label: "Pitcairn", value: "Pitcairn" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Palau", value: "Palau" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Poland", value: "Poland" },
  { label: "Puerto Rico", value: "Puerto Rico" },
  { label: "Korea, Democratic People's Republic of", value: "Korea, Democratic People's Republic of" },
  { label: "Portugal", value: "Portugal" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Palestine, State of", value: "Palestine, State of" },
  { label: "French Polynesia", value: "French Polynesia" },
  { label: "Qatar", value: "Qatar" },
  { label: "R\u00e9union", value: "R\u00e9union" },
  { label: "Romania", value: "Romania" },
  { label: "Russian Federation", value: "Russian Federation" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Sudan", value: "Sudan" },
  { label: "Senegal", value: "Senegal" },
  { label: "Singapore", value: "Singapore" },
  { label: "South Georgia and the South Sandwich Islands", value: "South Georgia and the South Sandwich Islands" },
  { label: "Saint Helena, Ascension and Tristan da Cunha", value: "Saint Helena, Ascension and Tristan da Cunha" },
  { label: "Svalbard and Jan Mayen", value: "Svalbard and Jan Mayen" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "San Marino", value: "San Marino" },
  { label: "Somalia", value: "Somalia" },
  { label: "Saint Pierre and Miquelon", value: "Saint Pierre and Miquelon" },
  { label: "Serbia", value: "Serbia" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { label: "Suriname", value: "Suriname" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Sweden", value: "Sweden" },
  { label: "Eswatini", value: "Eswatini" },
  { label: "Sint Maarten (Dutch part)", value: "Sint Maarten (Dutch part)" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Syrian Arab Republic", value: "Syrian Arab Republic" },
  { label: "Turks and Caicos Islands", value: "Turks and Caicos Islands" },
  { label: "Chad", value: "Chad" },
  { label: "Togo", value: "Togo" },
  { label: "Thailand", value: "Thailand" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tokelau", value: "Tokelau" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Timor-Leste", value: "Timor-Leste" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Taiwan, Province of China", value: "Taiwan, Province of China" },
  { label: "Tanzania, United Republic of", value: "Tanzania, United Republic of" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United States Minor Outlying Islands", value: "United States Minor Outlying Islands" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "United States", value: "United States" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Holy See (Vatican City State)", value: "Holy See (Vatican City State)" },
  { label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
  { label: "Venezuela, Bolivarian Republic of", value: "Venezuela, Bolivarian Republic of" },
  { label: "Virgin Islands, British", value: "Virgin Islands, British" },
  { label: "Virgin Islands, U.S.", value: "Virgin Islands, U.S." },
  { label: "Viet Nam", value: "Viet Nam" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Wallis and Futuna", value: "Wallis and Futuna" },
  { label: "Samoa", value: "Samoa" },
  { label: "Yemen", value: "Yemen" },
  { label: "South Africa", value: "South Africa" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" },
];

export const shareLinks = [
    { label: "WhatsApp", icon: <WhatsappIcon />, url: "https://www.whatsapp.com/" },
  { label: "Facebook", icon: <FacebookIcon />, url: "https://www.facebook.com" },
  { label: "Twitter", icon: <TwitterIcon />, url: "https://twitter.com" },
  { label: "Blogger", icon: <BloggerIcon />, url: "https://www.blogger.com" },
  { label: "Reddit", icon: <RedditIcon />, url: "https://www.reddit.com" },
  { label: "Tumblr", icon: <TumblrIcon />, url: "https://www.tumblr.com/" },
  { label: "Telegram", icon: <TelegramIcon />, url: "https://telegram.org/" },
  { label: "Instagram", icon: <InstagramIcon />, url: "https://www.instagram.com/" },
];

export const FiltersDefaultValues = Object.freeze({
  None: "None",
});







