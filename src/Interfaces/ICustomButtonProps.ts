interface ICustomButtonProps {
  text: string;
  icon: React.ReactNode;
  onPress: () => any;
  disabled?: boolean;
  pageName?: string;
}

export default ICustomButtonProps;
