import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_URL = "https://jtgl.beijing.gov.cn/jgj/lszt/659722/660341/";
const TIMEZONE = "Asia/Shanghai";
const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR"] as const;

type Weekday = (typeof WEEKDAYS)[number];

type RestrictionCycle = {
  startDate: string;
  endDate: string;
  restrictions: Record<Weekday, string[]>;
