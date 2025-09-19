import React from "react";

import { Profile } from "@/components/Profile";

const user = {
  username: "johndoe",
  email: "user@example.com",
  full_name: "John Doe",
  date_of_birth: "2025-09-19",
  avatar_path: "/profile-avatar.png",
  about_me: "Passionate about life tracking and productivity.",
  phone_number: "+1234567890",
  timezone: "UTC",
  user_id: 1,
  created_at: "2025-09-19T05:26:46.971Z",
  updated_at: "2025-09-19T05:26:46.971Z",
  is_active: true,
};

export default function ProfilePage() {
  return <Profile user={user} />;
}
