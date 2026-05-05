import { supabase } from '@/lib/supabase'
type Smoothie = {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  created_at: string
}

export default async function Home() {
  const { data, error } = await supabase
    .from('smoothies')
    .select('*')
  
    if (error) {
      return <p>Error loading smoothies 😢</p>
    }

  const smoothies: Smoothie[] = data || []

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold mb-12 mt-6 text-center">Smoothies 🍇</h1>

      <div className="mx-auto max-w-6xl px-10">
        <div className="grid grid-cols-2 gap-8">
          {smoothies.map((smoothie) => (
            <div key={smoothie.id} className="border border-gray-500/30 hover:-translate-y-2 transition-all w-fit mb-2 rounded-3xl ">
              <img 
                className='h-75 w-full rounded-t-3xl' 
                src={smoothie.image_url} 
                alt={smoothie.name} 
              />
              <div className='p-6 space-y-2'>
                <h2 className="text-3xl font-semibold">
                  {smoothie.name}
                </h2>
                <p className='text-gray-400 text-lg'>
                  {smoothie.description}
                </p>
                <p className="text-green-600 text-2xl font-bold">
                  ₦{smoothie.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}