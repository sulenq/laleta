import { useState, useEffect } from "react";
import { Employee } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useJwt from "../globalState/useJwt";

const useGetEmployee = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const { employeeId } = useParams();
  const jwt = useJwt();

  useEffect(() => {
    const getEmployeeOptions = {
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: "api/employee/" + employeeId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getEmployee = async () => {
      try {
        const response = await axios.request(getEmployeeOptions);
        console.log(response.data);

        if (response.data.status === 200) {
          setEmployee(response.data.employee);
        } else if (response.data.status === 404) {
          setNotFound(true);
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    if (!employee && jwt) {
      getEmployee();
    }
  }, [jwt, employee, employeeId, navigate]);

  if (error) {
    return {
      status: "error",
      data: error,
    };
  }

  if (notFound) {
    return {
      status: "notFound",
      data: {
        message: "Employee not found",
      },
    };
  }

  if (employee) {
    return {
      status: "found",
      data: employee,
    };
  }
};

export default useGetEmployee;
