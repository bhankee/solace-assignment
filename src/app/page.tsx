"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  // Helper function to check if a value matches the search term
  // Would go into a util file ideally.
  const matchesSearch = (value: any, searchTerm: string): boolean => {
    if (!searchTerm) return true;
    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
  };

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        matchesSearch(advocate.firstName, searchTerm) ||
        matchesSearch(advocate.lastName, searchTerm) ||
        matchesSearch(advocate.city, searchTerm) ||
        matchesSearch(advocate.degree, searchTerm) ||
        matchesSearch(advocate.specialties.join(" "), searchTerm) ||
        matchesSearch(String(advocate.yearsOfExperience), searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
          </tr>
          <tr>
            <th>Last Name</th>
          </tr>
          <tr>
            <th>City</th>
          </tr>
          <tr>
            <th>Degree</th>
          </tr>
          <tr>
            <th>Specialties</th>
          </tr>
          <tr>
            <th>Years of Experience</th>
          </tr>
          <tr>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
