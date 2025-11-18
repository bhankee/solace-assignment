import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

/**
 * NOTE: For now filtering happens over statically seeded data.
 * If database configuration is enabled, this logic moves into the SQL query
 * using indexed filtering and pagination.
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q")?.trim().toLowerCase() || "";

  if (!search) {
    return NextResponse.json({ data: advocateData });
  }

  const filtered = advocateData.filter((advocate) => {
    return (
      advocate.firstName.toLowerCase().includes(search) ||
      advocate.lastName.toLowerCase().includes(search) ||
      advocate.city.toLowerCase().includes(search) ||
      advocate.degree.toLowerCase().includes(search) ||
      advocate.specialties.join(" ").toLowerCase().includes(search) ||
      advocate.yearsOfExperience.toString().includes(search) ||
      advocate.phoneNumber.toString().includes(search)
    );
  });

  return NextResponse.json({ data: filtered });
}
