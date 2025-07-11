import { Loader } from 'rizzui';

interface LoadingProp {
  size?: "xl" | "sm" | "md" | "lg" | undefined,
}
export default function Loading(props: LoadingProp) {
  const { size = 'xl' } = props;
  return (
    <div className='flex h-full w-full justify-center'>
      <Loader variant="spinner" size={size} />
    </div>
  );
}
