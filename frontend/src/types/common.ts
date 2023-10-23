import { Location as ILocation } from "@remix-run/router/history";

export type Enum<E> = Record<keyof E, number | string> & { readonly [k: number]: string };