// app/products/api/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // Grab query params from the frontend request
        const { searchParams } = new URL(req.url);

        // Forward query params to Django backend
        const params = new URLSearchParams();
        searchParams.forEach((value, key) => {
            params.append(key, value);
        });

        const res = await fetch(`http://127.0.0.1:8000/api/acs/?${params.toString()}`);

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
        }

        const data = await res.json();
        console.log(data)
        return NextResponse.json(data);

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
