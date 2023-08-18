"use client";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Input from "./Input";
interface ISearchInputProps {}

const SearchInput = ({}: ISearchInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const url = queryString.stringifyUrl({
      query,
      url: "/search",
    });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What would you love to listen to?"
      value={value}
      onChange={(e) => setValue(e?.target.value)}
    />
  );
};

export default SearchInput;
