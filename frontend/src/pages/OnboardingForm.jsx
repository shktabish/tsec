import React, { useState } from 'react';
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

  const [responseMessage, setResponseMessage] = useState(''); // State for the response message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevData => ({ ...prevData, incomeCertificate: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file
    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.incomeCertificate);

    try {
      const response = await fetch("http://127.0.0.1:5000/extract_income", {
        method: 'POST',
        body: formDataToSend,
      });

      // Get the text response
      const result = await response.text();
      setResponseMessage(result); // Update the response message with the result
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred while processing your request.');
    }
  };

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
              <Select name="qualification" onValueChange={(value) => setFormData(prevData => ({ ...prevData, qualification: value }))}>
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
              <Label htmlFor="incomeCertificate">Income Certificate (PNG/JPG only)</Label>
              <Input id="incomeCertificate" name="incomeCertificate" type="file" accept=".png, .jpg, .jpeg" required onChange={handleFileChange} />
              <p className="text-sm text-muted-foreground">Upload your income certificate (PNG or JPG format)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Onboarding Form</Button>
        </CardFooter>
      </form>

      {responseMessage && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">{responseMessage}</p>
        </div>
      )}
    </Card>
  );
}
