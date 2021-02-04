import Head from 'next/head'

const PageHeader = ({
  children
}) => {

  return (
    <Head>
      {children}
    </Head>
  )
}

export default PageHeader