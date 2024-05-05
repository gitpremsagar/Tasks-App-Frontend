"use client";
import { TASKS_ENDPOINT } from "@/configs/constants.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Section from "@/components/ui/Section";
import { selectToken } from "@/redux/tokenSlice";
import { useSelector } from "react-redux";

export default function TasksSection() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector(selectToken);

  useEffect(() => {
    axios
      .get(TASKS_ENDPOINT, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Section className="p-20">
      <h2 className="text-2xl font-bold mb-10">Tasks</h2>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.taskId} className="mb-5">
              <h3 className="text-xl font-bold">{task.taskName}</h3>
              <p>{task.taskDescription}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
