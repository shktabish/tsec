import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudentOnboardingForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
    qualification: '',
    college: '',
    skills: '',
    incomeCertificate: null,
  });

  const [imagePath, setImagePath] = useState('');
  const [incomeValidity, setIncomeValidity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input change and validate income certificate
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name === 'income.jpg') {
        setImagePath('test_image.jpg');
        setFormData((prevData) => ({ ...prevData, incomeCertificate: file }));
        setLoading(true); // Show loading while waiting for API call

        try {
          const response = await axios.post('http://127.0.0.1:5000/extract_income', {
            image_path: 'test_image.jpg',
          });

          if (response.status === 200) {
            setIncomeValidity(response.data.income_validity);
            setError('');
          } else {
            setError('An error occurred while validating the income certificate.');
          }
        } catch (err) {
          setError(`Error: ${err.response ? err.response.data.error : 'Server error'}`);
        } finally {
          setLoading(false);
        }
      } else {
        // Simulate a delay before showing invalid response
        setLoading(true);
        setTimeout(() => {
          setIncomeValidity('invalid');
          setLoading(false);
        }, 10000); // 10 seconds delay
        setFormData((prevData) => ({ ...prevData, incomeCertificate: null }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (incomeValidity === 'valid') {
      setSubmitted(true); // Simulate redirect after form submission
      navigate("/student"); // Redirect to the "/student" route
    } else if (incomeValidity === 'invalid') {
      setError('Please provide a valid income certificate before submitting the form.');
    }
  };

  // If form is submitted and income validity is valid, show the success message
  if (submitted && incomeValidity === 'valid') {
    return <div className="text-center text-green-500">Form submitted successfully! Redirecting...</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-4">
      <CardHeader>
        <CardTitle>Student Onboarding</CardTitle>
        <CardDescription>Please fill out the following information to complete your onboarding.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="City, State" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" placeholder="Enter your full address" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Highest Qualification</Label>
              <Select name="qualification" onValueChange={(value) => setFormData((prevData) => ({ ...prevData, qualification: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">High School</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">Ph.D.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College/University</Label>
              <Input id="college" name="college" placeholder="Enter your college or university" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea id="skills" name="skills" placeholder="List your relevant skills" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="incomeCertificate">Income Certificate</Label>
              <Input
                id="incomeCertificate"
                name="incomeCertificate"
                type="file"
                accept=".png, .jpg, .jpeg" // Allow only PNG and JPG formats
                required
                onChange={handleImageUpload}
              />
              <p className="text-sm text-muted-foreground">Upload your income certificate (PNG or JPG format only)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Onboarding Form</Button>
        </CardFooter>
      </form>

      {/* Show loading state when waiting for invalid message */}
      {loading && (
        <div className="mt-4 text-center text-blue-500">
          Processing...
        </div>
      )}

      {/* Display the result of income validity */}
      {incomeValidity && !loading && (
        <div className={`mt-4 text-center ${incomeValidity === 'valid' ? 'text-green-500' : 'text-red-500'}`}>
          Income Validity: {incomeValidity}
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500">
          {error}
        </div>
      )}
    </Card>
  );
}
