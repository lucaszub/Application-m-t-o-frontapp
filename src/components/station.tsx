import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function Station() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Les stations météorologiques</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Il y a 62 stations météorologiques dont 42 en métropolitaine.</p>
        <p>Les données sont alimentées tous les jours.</p>
      </CardContent>
      <CardFooter>
        <div>test</div>
      </CardFooter>
    </Card>
  );
}
