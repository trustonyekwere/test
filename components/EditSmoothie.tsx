'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PencilIcon } from 'lucide-react'

type Smoothie = {
    id: number
    name: string
    description: string | null
    price: number
}

export default function EditSmoothie({ smoothie }: { smoothie: Smoothie }) {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(smoothie.name)
    const [description, setDescription] = useState(smoothie.description || '')
    const [price, setPrice] = useState(String(smoothie.price))
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        setLoading(true)

        const { error } = await supabase
        .from('smoothies')
        .update({
            name,
            description,
            price: Number(price),
        })
        .eq('id', smoothie.id)

        if (error) {
        alert('Update failed 😢')
        console.error(error)
        } else {
        alert('Updated! 🎉')
        window.location.reload()
        }

        setLoading(false)
    }

    if (!editing) {
        return (
            <div className='flex justify-end'>
                <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-600 text-white p-4 rounded-full mt-2 hover:scale-110"
                >
                    <div className='flex items-center gap-2'>
                        <div>
                            <PencilIcon size={18} />
                        </div>
                    </div>
                </button>
            </div>
        )
    }

    return (
        <div className="mt-2 space-y-2">
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-1 w-full"
        />

        <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 w-full"
        />

        <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-1 w-full"
        />

        <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-600 text-white px-3 py-1 rounded-xl hover:scale-110"
        >
            {loading ? 'Saving...' : 'Save'}
        </button>
        </div>
    )
}