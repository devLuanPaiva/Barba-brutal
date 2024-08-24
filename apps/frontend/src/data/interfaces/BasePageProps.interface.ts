import React from "react";

export interface BasePageProps {
  children: React.ReactNode;
}

export interface ContainerBgProps extends BasePageProps {
  image: string;
}

