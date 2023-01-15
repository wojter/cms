import Link from "next/link";

const CategoryLabel = (props) => {
  return (
    <div className="flex gap-3">
      <Link href="#">
        <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase text-blue-600">
          {props.category}
        </span>
      </Link>
    </div>
  );
};

export default CategoryLabel;
