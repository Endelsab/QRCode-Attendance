import { Html, Heading } from "@react-email/components";
import * as React from "react";

export const EmailTemplate = (firstName: string, now: string) => (
     <Html>
          <Heading>
               Your children, {firstName} has entered in campus at exactly at{" "}
               {now}
          </Heading>
     </Html>
);
