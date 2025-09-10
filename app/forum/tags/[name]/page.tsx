import { CardList } from "@/components/card-component/card/CardList";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;

  //   const content = await getContentById(slug);

  return (
    <>
      <div className="container mx-auto w-[800px] mt-[80px] ">
        <div className="bg-white rounded-md shadow-md h-[53px] flex items-center px-4 mb-2">
          <p className="text-secondary font-bold text-[20px]">ស្លាក #</p>
        </div>
        <div className="bg-white rounded-md shadow-md h-[120px]  px-4 mb-2 ">
          <h2 className="text-secondary font-bold text-[20px] py-3">
            # {name}
          </h2>
          <p className="text-sm pb-3 space-y-2">
            ការរៀបចំ, គ្រប់គ្រង,
            និងរក្សាទុកទិន្នន័យសម្រាប់ការចូលប្រើនិងគ្រប់គ្រងបានយ៉ាងមានប្រសិទ្ធភាព។
            អ្នកអានអាចសិក្សាពីរចនាសម្ព័ន្ធទិន្នន័យសាមញ្ញៗដូចជា អារេ,
            បញ្ជីភ្ជាប់, ស្ទាក់, គូ, ដើមឈើ, និងក្រាហ្វ,
            រួមទាំងអាល់ហ្គូរីធម៍សម្រាប់ស្វែងរក, តម្រៀប,
            និងធ្វើដំណើរតាមរចនាសម្ព័ន្ធទិន្នន័យ។
          </p>
        </div>
        <div className="flex mb-9">
          <CardList></CardList>
        </div>
      </div>
    </>
  );
}
