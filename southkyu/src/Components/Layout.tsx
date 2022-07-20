interface PropsType {
  children?: React.ReactNode;
}
export default function Layout({ children }: PropsType) {
  return <section className="todoapp">{children}</section>;
}
