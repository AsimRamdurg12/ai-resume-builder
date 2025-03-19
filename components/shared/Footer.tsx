import { navigation } from "@/lib/constants";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CopyrightIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t w-full">
      <article className="grid grid-cols-1 sm:grid-cols-2 mx-4 gap-4">
        <div className="space-y-2 mt-4">
          <h1 className="font-bold text-2xl">AI Resume</h1>
          <p>
            We leverage AI technology to help job seekers create professional,
            ATS-optimized resumes that stand out and get interviews.
          </p>
          <div className="flex gap-4 py-4">
            <FaGithub size={30} />
            <FaTwitter size={30} />
            <FaInstagram size={30} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mt-4">
            <h1 className="font-bold text-2xl">Navigation</h1>
            <div className="flex flex-col gap-4">
              {navigation.map((nav) => (
                <a
                  key={nav.id}
                  href={nav.link}
                  className="hover:text-green-500"
                >
                  {nav.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <h1 className="font-bold text-2xl mb-4">Newsletter</h1>
              <p>
                Stay updated with the latest AI content generation news and
                tips.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              <Input placeholder="enter your email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </article>
      <hr className="m-4 " />

      <div className="flex gap-2 mx-4">
        <CopyrightIcon /> AI Resume Builder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
