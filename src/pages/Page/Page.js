import Item from '../../components/Item/Item';
import RouteLoader from '../../components/RouteLoader/RouteLoader';

function Page() {
  return (
    <main>
      <RouteLoader>
        <Item />
      </RouteLoader>
    </main>
  );
}

export default Page;
