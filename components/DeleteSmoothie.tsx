'use client'

import { supabase } from '@/lib/supabase'
import { Trash2Icon } from 'lucide-react'

export default function DeleteSmoothie({ id }: { id: number }) {
    const handleDelete = async () => {
        const confirmDelete = confirm('Delete this smoothie?')

        if (!confirmDelete) return

        const { error } = await supabase
        .from('smoothies')
        .delete()
        .eq('id', id)

        if (error) {
        alert('Delete failed 😢')
        console.error(error)
        } else {
        alert('Deleted! 🗑️')
        window.location.reload()
        }
    }

    return (
        <button
        onClick={handleDelete}
        className="bg-red-600 text-white p-4 rounded-full mt-2 hover:scale-110"
        >
            <div className='flex items-center gap-2'>
                <div>
                    <Trash2Icon size={18} />
                </div>
            </div>
        </button>
    )
}