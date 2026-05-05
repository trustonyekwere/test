'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PlusIcon } from 'lucide-react'

export default function AddSmoothieForm() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.from('smoothies').insert([
        {
            name,
            description,
            price: Number(price),
        },
        ])

        if (error) {
        alert('Error adding smoothie 😢')
        console.error(error)
        } else {
        alert('Smoothie added! 🎉')
        setName('')
        setDescription('')
        setPrice('')
        }

        if (!error) {
            window.location.reload()
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="my-10 space-y-5 border p-10 rounded-3xl border-gray-500/30">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full border-gray-500/30 rounded-lg"
                required
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full border-gray-500/30 rounded-lg"
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 w-full border-gray-500/30 rounded-lg"
                required
            />

            <div className='flex justify-center'>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 hover:scale-110 rounded-lg"
                >
                    <div className='flex items-center gap-2'>
                        {loading ? 'Adding...' : 'Add'} <PlusIcon size={18} />
                    </div>
                </button>
            </div>
        </form>
    )
}