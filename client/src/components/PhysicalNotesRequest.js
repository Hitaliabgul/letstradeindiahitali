import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const PhysicalNotesRequest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState(null);
  const [paperQuality, setPaperQuality] = useState(null); // Changed to null initially
  const [countryOptions, setCountryOptions] = useState(['']);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [agreement, setAgreement] = useState(false);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countries = response.data.map((country) => ({
          value: country.cca2,
          label: country.name?.common || 'Unknown Country',
        }));
        setCountryOptions(countries);
        // Set default country as India if it's available
        const india = countries.find(country => country.label === 'India');
        if (india) {
          setCountry(india); // Set India as default
        }
      })
      .catch((error) => {
        toast.error("Failed to load country data.");
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handlePaperQualityChange = (selectedOption) => {
    if (selectedOption?.value === 'none') {
      setPaperQuality(null); // Deselect paper quality
    } else {
      setPaperQuality(selectedOption);
      setLanguage(null); // Deselect language when paper quality is selected
    }
  };

  const handleLanguageChange = (selectedOption) => {
    if (selectedOption?.value === 'none') {
      setLanguage(null); // Deselect language
    } else {
      setLanguage(selectedOption);
      setPaperQuality(null); // Deselect paper quality when language is selected
    }
  };
  const validateInputs = () => {
  
    const postalPattern = /^[0-9]+$/;
   
    if (!name || !email || !contact || !addressLine1 || !city || !state || !postalCode || !country) {
      toast.error("All fields are required.");
      return false;
    }
   
  
    if (!postalPattern.test(postalCode)) {
      toast.error("Postal code must contain only numbers.");
      return false;
    }
    if (!agreement) {
      toast.error("You must agree to the terms before submitting.");
      return false;
    }
    return true;
  };

  const handleRequest = () => {
    if (!validateInputs()) return;
    toast.info("Processing your request...");

    // Check if paper quality or language is selected
    const selectedPaperQuality = paperQuality ? paperQuality.label : 'None';
    const selectedLanguage = language ? language.label : 'None';
    
    console.log("Selected Paper Quality: ", selectedPaperQuality);
  console.log("Selected Language: ", selectedLanguage);
    axios.post('http://localhost:5000/api/auth/notes/request-physical', {
      name,
      email,
      contact,
      address: {
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        postalCode,
        country: country?.label,
      },
      language: selectedLanguage, // Send selected language
      paperQuality: selectedPaperQuality, // Send selected paper quality
      price: paperQuality?.price || 0, // Send the price based on the selected paper quality
      date,
    })
      .then(() => {
        toast.success(`Request for notes sent successfully!`);
        // Reset form fields
        setName('');
        setEmail('');
        setContact('');
        setAddressLine1('');
        setAddressLine2('');
        setLandmark('');
        setCity('');
        setState('');
        setPostalCode('');
        setCountry(null);
        setLanguage(null);
        setPaperQuality(null);
        setDate(new Date().toISOString().split('T')[0]);
        setAgreement(false);
      })
      .catch(() => toast.error("Failed to request notes. Try again."));
  };
  

  return (
    <div className='request-notes'>
      <h2>Request Physical Notes</h2>
      <p>Get your notes delivered to your doorstep in the quality you choose!</p>
      <div>

      </div>
      <div className="physical-notes-request-container">
        <div className="physical-notes-box">
          <div className='form-group relative'>
            <input className='floating-input' type="text" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} />
            <label className="floating-label reqphyfont">Name*</label>
          </div>
          <div className='form-group relative'>
            <input className='floating-input' type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="floating-label reqphyfont">Email*</label>
          </div>
          <div className='form-group relative'>
            <input className='floating-input' type="text" placeholder="Contact Number*" value={contact} onChange={(e) => setContact(e.target.value)} />
            <label className="floating-label reqphyfont">Contact Number*</label>
          </div>
          <div className='form-group relative'>
            <input className='floating-input' placeholder="Address Line 1*" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
            <label className="floating-label reqphyfont">Address Line 1*</label>
          </div>
          <div className='form-group relative'>
            <input className='floating-input' placeholder="Address Line 2 (Optional)" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
            <label className="floating-label reqphyfont">Address Line 2 (Optional)</label>
          </div>


          <div className='form-group relative'>
            <input className='floating-input' type="text" placeholder="Landmark (Optional)" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            <label className="floating-label reqphyfont">Landmark (Optional)</label>
          </div>

          <Select
            options={countryOptions}
            value={country}
            onChange={(selectedOption) => setCountry(selectedOption)}
            placeholder="Select Country*"
            className='mt-3 mb-3'
          />
          <div className='form-group relative'>
            <input className='floating-input' type="text" placeholder="State*" value={state} onChange={(e) => setState(e.target.value)} />
            <label className="floating-label reqphyfont">State*</label>
          </div>

          <div className='form-group relative'>
            <input className='floating-input' type="text" placeholder="City*" value={city} onChange={(e) => setCity(e.target.value)} />
            <label className="floating-label reqphyfont">City*</label>
          </div>

          <div className='form-group relative'>
            <input className='floating-input' type="text" placeholder="Pin Code*" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <label className="floating-label reqphyfont">Pin Code*</label>
          </div>


         
      <Select
        options={[
          { label: "None", value: "none" },
          { label: "English - ₹1000", value: "english", price: 1000 },
          { label: "Hindi - ₹1000", value: "hindi", price: 1000 },
          { label: "Both - ₹2000", value: "both", price: 2000 }
        ]}
        value={language}
        onChange={handleLanguageChange}
        placeholder="High Paper Quality*"
        isDisabled={paperQuality !== null} // Disable if paper quality is selected
         className='mt-3 mb-3'
      />
 <Select
        options={[
          { label: "None", value: "none" },
          { label: "English - ₹500", value: "english", price: 500 },
          { label: "Hindi - ₹500", value: "hindi", price: 500 },
          { label: "Both - ₹1000", value: "both", price: 1000 }
        ]}
        value={paperQuality}
        onChange={handlePaperQualityChange}
        placeholder="Low Paper Quality*"
        isDisabled={language !== null} // Disable if language is selected
         className='mt-3 mb-3'
      />  

          <div className='terms'>
            <div>
              <input
                type="checkbox"
                className="input-checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
            </div>
            <div>
              <span className='termss'>I confirm that this is a physical book purchase and agree to pay the listed price along with applicable shipping charges.</span>
            </div>
          </div>

          <button onClick={handleRequest} >
            Submit Request
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PhysicalNotesRequest;
