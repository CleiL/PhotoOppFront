import Image from 'next/image'

export default function Header() {
  return (
    <div className="w-full bg-[#EDEDED] rounded border border-gray-300 px-4 py-2 flex justify-between items-center">
      <Image src="/images/logo-nexlab.svg" alt="NEX.lab" width={80} height={50} />
      <span className="text-sm text-gray-700 font-light">we make tech simple_</span>
    </div>
  )
}
