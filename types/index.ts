import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  username: string;
  email: string;
  full_name: string;
  date_of_birth: string;
  avatar_path: string;
  phone_number: string;
  timezone: string;
  about_me: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type ViewType = "week" | "month" | "year";
