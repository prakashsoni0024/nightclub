import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAvailabilityStats } from "@/services/adminService";

export default function useAvailability() {
  const [availability, setAvailability] = useState({
    REGULAR: 0,
    VIP: 0,
    PREMIUM_LOUNGE: 0,
  });

  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  const fetchAvailability = async () => {
    try {
      const data = await getAvailabilityStats();

      setAvailability(data.availability);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load availability");
    } finally {
      setAvailabilityLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return {
    availability,
    availabilityLoading,
    fetchAvailability,
  };
}