import styles from "./DisplayOption.module.css";
import { AiOutlineUnorderedList, AiOutlineAppstore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeDisplay } from "../../redux/features/playerSlice";
function DisplayOption() {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.player);
  return (
    <div>
      <input
        type="radio"
        id="radio-1"
        name="radio"
        onChange={() => dispatch(changeDisplay(1))}
        checked={display === 1 ? true : false}
      />
      <label
        htmlFor="radio-1"
        className="p-4 bg-slate-600 rounded-tl rounded-bl"
      >
        <AiOutlineUnorderedList size={25} color="white" />
      </label>
      <input
        type="radio"
        id="radio-2"
        name="radio"
        onChange={() => dispatch(changeDisplay(4))}
        checked={display === 4 ? true : false}
      />
      <label
        htmlFor="radio-2"
        className="p-4 bg-slate-600 rounded-tr rounded-br"
      >
        <AiOutlineAppstore size={25} color="white" />
      </label>
    </div>
  );
}

export { DisplayOption };
