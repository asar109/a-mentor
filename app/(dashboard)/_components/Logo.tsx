import Image from 'next/image'

function Logo() {
  return <Image className='p-6 flex justify-center items-center w-full' src={'/logo.svg'} width={140} height={140} alt={'logo'} />
}

export default Logo 