import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [amountFilter, setAmountFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/scholarships');
        setScholarships(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch scholarships. Please try again later.');
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  // Filter scholarships based on the amount, search term, and deadline
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesAmount = scholarship?.amount >= amountFilter;
    const matchesSearchTerm = scholarship?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDeadline = deadlineFilter ? new Date(scholarship.deadline) <= new Date(deadlineFilter) : true;
    return matchesAmount && matchesSearchTerm && matchesDeadline;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold mb-6">Available Scholarships</h1>

      {/* Search Bar */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter for minimum amount and deadline */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="amount-filter" className="block text-sm font-medium mb-2">Minimum Amount ($)</label>
          <Slider
            id="amount-filter"
            min={0}
            max={3000}
            step={100}
            value={[amountFilter]}
            onValueChange={(value) => setAmountFilter(value[0])}
            className="w-full pt-4"
          />
          <span className="text-sm mt-1 block">${amountFilter.toLocaleString()}</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="deadline-filter" className="block text-sm font-medium mb-2">Deadline Before</label>
          <input
            type="date"
            id="deadline-filter"
            className="p-2 border rounded w-full"
            value={deadlineFilter}
            onChange={(e) => setDeadlineFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid gap-6 md:grid-cols-1">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map(scholarship => (
            <Card key={scholarship._id} className="flex flex-col bg-white">
              <CardHeader>
                <CardTitle>{scholarship.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{scholarship.description}</p>
                <div className="space-y-1">
                  <p className="font-semibold">Amount: ${scholarship.amount.toLocaleString()}</p>
                  <p>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
                  <p><strong>Eligibility:</strong> {scholarship.eligibility || 'Not specified'}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => window.open(scholarship.application_link, '_blank')}>
                  Apply Here <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground mt-6">No scholarships match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default ScholarshipList;
