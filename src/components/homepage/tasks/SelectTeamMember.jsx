"use client";
import { USERS_ENDPOINT } from "@/configs/constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setToken } from "@/redux/tokenSlice";
import { useState, useEffect } from "react";
import SelectElement from "@/components/ui/SelectElement";

const SelectTeamMember = ({ name, onChange, value }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .get(USERS_ENDPOINT, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setTeamMembers(response.data);
        setIsLoading(false);

        // add default option
        setTeamMembers((prevMembers) => [
          {
            userId: "",
            firstName: "Select",
            lastName: "Team Member",
          },
          ...prevMembers,
        ]);
      })
      .catch((error) => {
        console.error("Error fetching team members: ", error);
        setIsLoading(false);
      });
  }, [token]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SelectElement
          label="Select Team Member"
          options={teamMembers.map((member) => ({
            value: `${member.userId}`,
            label: `${member.firstName} ${member.lastName}`,
          }))}
          onChange={onChange}
          name={name}
          value={value}
        />
      )}
    </div>
  );
};

export default SelectTeamMember;
