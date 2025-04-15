import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SectionTitle = ({ title = "Overview", description = "" }) => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="px-0 py-4 md:py-2">
        <div className="flex gap-x-3">
          <div>
            <CardTitle className="font-bold text-2xl mb-1 line-clamp-1">
              {title}
            </CardTitle>
            <CardDescription className="text-sm font-medium line-clamp-1">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SectionTitle;
