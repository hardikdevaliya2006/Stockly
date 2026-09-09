import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(url, key);

export async function getProducts({
  search = "",
  category = "",
  status = "",
  sort = "newest",
  page = 1,
} = {}) {
  let query = supabase.from("products").select("*", { count: "exact" });
  if (search) query = query.ilike("name", `%${search}%`);
  if (category) query = query.eq("category", category);
  if (status === "in") query = query.gte("stock", 10);
  if (status === "low") query = query.gt("stock", 0).lt("stock", 10);
  if (status === "out") query = query.eq("stock", 0);
  const ordering = {
    newest: ["created_at", false],
    oldest: ["created_at", true],
    price_asc: ["price", true],
    price_desc: ["price", false],
    name: ["name", true],
  }[sort] || ["created_at", false];
  query = query
    .order(ordering[0], { ascending: ordering[1] })
    .range((page - 1) * 12, page * 12 - 1);
  const { data, error, count } = await query;
  if (error) throw error;
  return { products: data, count: count || 0 };
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getStats() {
  const { data, error } = await supabase
    .from("products")
    .select("price, stock")
    .eq("is_active", true);
  if (error) throw error;
  return {
    total: data.length,
    low: data.filter((p) => p.stock > 0 && p.stock < 10).length,
    out: data.filter((p) => p.stock === 0).length,
    value: data.reduce((sum, p) => sum + Number(p.price) * p.stock, 0),
  };
}

export async function saveProduct(product, id) {
  const payload = {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    updated_at: new Date().toISOString(),
  };
  const { data, error } = id
    ? await supabase
        .from("products")
        .update(payload)
        .eq("id", id)
        .select()
        .single()
    : await supabase.from("products").insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(filename, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filename);
  return data.publicUrl;
}
