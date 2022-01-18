import * as Styles from './styles';

const PageHeader = ({
  children
}) => {

  return (
    <Styles.Header>
      {children}
    </Styles.Header>
  )
}

export default PageHeader