/**
 * Profile Component
 *
 * Displays user profile information and allows editing.
 *
 * @author JX
 */

"use client";

import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Avatar } from "@heroui/avatar";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import React from "react";

import { Skeleton } from "../Atom";

import { title } from "@/components/primitives";
import { User } from "@/types";

interface Props {
  user: User;
}

export const Profile = (props: Props) => {
  const { user } = props;

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="relative w-full h-32 xl:h-48 flex items-center justify-center">
        <Skeleton
          className="object-cover w-full h-full rounded-3xl"
          isLoaded={!loading}
        >
          <Image
            alt="Profile background"
            className="object-cover w-full h-full rounded-b-3xl"
            src="/vercel.svg"
          />
        </Skeleton>
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-10">
          <Skeleton
            className="ring-4 ring-white dark:ring-black shadow-lg w-32 h-32 rounded-full"
            isLoaded={!loading}
          >
            <Avatar
              alt={user.full_name}
              className="w-32 h-32"
              size="lg"
              src={user.avatar_path}
            />
          </Skeleton>
        </div>
      </div>

      <Card className="mt-20 w-full max-w-xl shadow-xl">
        <CardBody>
          <Skeleton className="mb-4 rounded-xl" isLoaded={!loading}>
            <h1 className={title({ size: "sm" }) + " text-center"}>
              {user.full_name}
            </h1>
            <p className="text-center text-default-500">@{user.username}</p>
          </Skeleton>

          <Form className="grid gap-4">
            <Skeleton className="rounded-xl" isLoaded={!loading}>
              <Input readOnly label="Email" value={user.email} />
            </Skeleton>

            <Skeleton className="rounded-xl" isLoaded={!loading}>
              <Input readOnly label="Full Name" value={user.full_name} />
            </Skeleton>

            <Skeleton className="rounded-xl" isLoaded={!loading}>
              <Input
                readOnly
                label="Date of Birth"
                value={user.date_of_birth}
              />
            </Skeleton>

            <Skeleton className="rounded-xl" isLoaded={!loading}>
              <Input readOnly label="Phone Number" value={user.phone_number} />
            </Skeleton>

            <Skeleton className="rounded-xl" isLoaded={!loading}>
              <Input readOnly label="Timezone" value={user.timezone} />
            </Skeleton>

            <Skeleton className="rounded-xl" isLoaded={!loading}>
              <Textarea
                readOnly
                label="About Me"
                minRows={3}
                value={user.about_me}
              />
            </Skeleton>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
