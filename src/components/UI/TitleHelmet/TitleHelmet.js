import { Helmet } from 'react-helmet-async';

function TitleHelmet(props) {
  const { title } = props;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </div>
  )
}

export default TitleHelmet
