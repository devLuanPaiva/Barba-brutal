import React from "react";

interface BasePageProps {
  children: React.ReactNode;
}

interface ContainerBgProps extends BasePageProps {
  image: string;
}

export type { BasePageProps, ContainerBgProps };
