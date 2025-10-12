const url: string = import.meta.env.VITE_SEARCH_URL

// APIからデータを取得する関数
export const locationSerch = async(value: string) => {
    const searchUrl: string = `${url}${encodeURIComponent(value)}&addressdetails=1`;
    const res = await fetch(searchUrl);
    return await res.json();
}
