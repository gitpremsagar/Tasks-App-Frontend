"use client";
import { PROJECTS_ENDPOINT } from "@/configs/constants.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Section from "@/components/ui/Section";
import { selectToken } from "@/redux/tokenSlice";
import { useSelector } from "react-redux";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RedBorderButton from "@/components/ui/RedBorderButton";
import Cookies from "js-cookie";

//table structure
// projectName varchar(255)
// projectDescription varchar(255)
// createdAt datetime
// updatedAt datetime

export default function CreateProject() {
  const router = useRouter();

  // if no token in cookie, redirect to login page
  useEffect(() => {
    // get token from cookie
    const tokenFromCookie = Cookies.get("token");
    if (!tokenFromCookie) {
      router.push("/login");
    }
  }, []);

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
  });

  //   //   log project data
  //   useEffect(() => {
  //     console.log("projectData", projectData);
  //   }, [projectData]);

  const [isLoading, setIsLoading] = useState(false);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector(selectToken);

  const projectNameRef = useRef();
  const projectDescriptionRef = useRef();

  //   redirect to login page if not logged in
  //   TODO: Uncomment this block of code
  //   useEffect(() => {
  //     if (!token) {
  //       router.push("/login");
  //     }
  //   }, [token]);

  const handleProjectDataChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate project data
    if (!projectData.projectName || !projectData.projectDescription) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    axios
      .post(PROJECTS_ENDPOINT, projectData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        // console.log("Project created: ", response.data);
        setIsLoading(false);
        setCreatedSuccessfully(true);

        // reset form
        setProjectData({
          projectName: "",
          projectDescription: "",
        });

        // redirect to projects page after creating project
        router.push("/");
      })
      .catch((error) => {
        console.error("Error creating project: ", error);
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <main className="min-h-screen">
      <Section className="p-20">
        <h2 className="text-2xl font-bold mb-10">Create Project</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Project Name"
            placeholder="Enter project name"
            name="projectName"
            onChange={handleProjectDataChange}
            inputRef={projectNameRef}
          />
          <InputField
            label="Project Description"
            placeholder="Enter project description"
            name="projectDescription"
            onChange={handleProjectDataChange}
            inputRef={projectDescriptionRef}
          />
          <Button type="submit">Create Project</Button>
        </form>
        {isLoading && <p>Creating project...</p>}
        {error && <p>Error creating project: {error.message}</p>}
        {createdSuccessfully && <p>Project created successfully!</p>}
        <br />
        <Link href="/">
          <RedBorderButton>Go back to dashboard</RedBorderButton>
        </Link>
      </Section>
    </main>
  );
}
