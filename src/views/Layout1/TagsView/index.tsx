import { Flex, Tag } from "antd";

export default function TagsView() {
  const handleClose = () => {};
  return (
    <Flex gap="4px 0" wrap="wrap">
      <Tag color="magenta" closeIcon={true} onClose={() => handleClose()}>
        magenta
      </Tag>
      <Tag color="red">red</Tag>
      <Tag color="volcano">volcano</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="gold">gold</Tag>
      <Tag color="lime">lime</Tag>
      <Tag color="green">green</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="geekblue">geekblue</Tag>
      <Tag color="purple">purple</Tag>
    </Flex>
  );
}
