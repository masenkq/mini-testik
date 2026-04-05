"use client"
import { useState, useEffect, useRef } from "react"
import { addItem, getItems } from "./actions"

interface DBItem {
  id: number;
  value: string;
}

export default function Home() {
  const [items, setItems] = useState<DBItem[]>([]);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Načtení dat při startu
  useEffect(() => {
    const load = async () => {
      const data = await getItems();
      setItems(data);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;

    const val = inputRef.current.value;
    const formData = new FormData();
    formData.append("value", val);

    await addItem(formData);
    
    // Update lokálního stavu
    const updatedData = await getItems();
    setItems(updatedData);
    setSessionCount(prev => prev + 1);
    inputRef.current.value = ""; // Vyčištění pole
  };

  return (
    <main className="p-10 font-sans">
      <h1 className="text-2xl mb-4">Databázový vstup</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input 
          ref={inputRef}
          name="value"
          type="text" 
          placeholder="Napiš něco..."
          className="border p-2 mr-2 text-black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 px-4 rounded">
          Potvrdit
        </button>
      </form>

      <div className="mb-4 p-2 bg-gray-100 inline-block">
        Položek přidáno v této relaci: <strong>{sessionCount}</strong>
      </div>

      <h2 className="text-xl mt-4">Položky v DB:</h2>
      <ul className="list-disc ml-5">
        {items.map(item => (
          <li key={item.id}>{item.value} (ID: {item.id})</li>
        ))}
      </ul>
    </main>
  );
}