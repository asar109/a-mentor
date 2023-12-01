import Image from 'next/image'

function Logo() {
  return <Image src={'/logo.svg'} width={140} height={140} alt={'logo'} />
}

export default Logo 