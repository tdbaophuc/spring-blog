import Avatar from "./Avatar";

interface IProps {
  name: string;
  avatar: string;
}

const UserInfo = ({ name, avatar }: IProps) => {
  return (
    <div className="flex items-center my-4 space-x-3">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md cursor-pointer">
        {/* Nếu muốn dùng ảnh thật thay Avatar component, bỏ comment phần dưới */}
        {/* <img
          src={avatar}
          alt={`${name} avatar`}
          className="w-full h-full object-cover rounded-full"
        /> */}
        <Avatar name={name} className="w-full h-full" onClick={() => null} />
      </div>
      <h4 className="text-gray-700 text-lg sm:text-xl font-semibold truncate">
        {name}
      </h4>
    </div>
  );
};

export default UserInfo;
