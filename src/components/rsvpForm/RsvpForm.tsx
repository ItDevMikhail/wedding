import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components//ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const drinkOptions = [
  { id: "wine_red", label: "Вино красное" },
  { id: "wine_white", label: "Вино белое" },
  { id: "whiskey", label: "Крепкий алкоголь" },
  { id: "none", label: "Не пью" },
];

const foodOptions = [
  { id: "meat", label: "Мясо" },
  { id: "fish", label: "Рыба" },
  { id: "veggie", label: "Вегетарианское" },
  { id: "seafood", label: "Морепродукты" },
];

interface FormDataProps {
  name: string;
  attending: string;
  food: string[];
  drinks: string[];
}

const initialFormState: FormDataProps = {
  name: "",
  attending: "yes",
  food: [],
  drinks: [],
};

export const RsvpForm = () => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState<FormDataProps>(initialFormState);

  const resetForm = () => {
    setFormData(initialFormState);
    // Если используешь нативные инпуты или селекты shadcn без контролируемого value,
    // иногда полезно вызвать e.target.reset() в handleSubmit
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const url = import.meta.env.VITE_APPS_URL;

      await fetch(
        url,
        {
          method: "POST",
          mode: "no-cors", // Обязательно для Google Scripts
          body: JSON.stringify(formData),
        },
      );

      setStatus("success");
      resetForm();
      // alert("Ответ отправлен!");
    } catch (err) {
      setStatus("error");
      alert("Произошла ошибка при отправке. Попробуйте еще раз.");
    }
  };

  const handleCheckboxChange = (field: keyof FormDataProps, label: string) => {
    setFormData((prev) => {
      const currentItems = prev[field];
      const isSelected = currentItems.includes(label);
      return {
        ...prev,
        [field]:
          isSelected && Array.isArray(currentItems)
            ? currentItems.filter((item) => item !== label)
            : [...currentItems, label],
      };
    });
  };

  return (
    <section className="py-20 px-4 bg-[#fdfaf7]">
      <Card className="max-w-md mx-auto border-none shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-center">
            RSVP
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <h3 className="text-2xl font-serif text-[#d1bfa7]">
                Благодарим за ответ!
              </h3>
              <p className="text-gray-500 mt-2">
                Мы очень ждем встречи с вами.
              </p>
              <Button
                variant="ghost"
                onClick={() => setStatus("idle")}
                className="mt-4 text-xs uppercase tracking-widest"
              >
                Отправить еще раз
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium uppercase tracking-wider text-gray-500"
                >
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  className="border-gray-200 focus:ring-beige-500"
                  placeholder="Имя Фамилия"
                  required
                  minLength={5}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium uppercase tracking-wider text-gray-500">
                  Присутствие
                </Label>
                <Select
                  value={formData.attending}
                  onValueChange={(val) =>
                    setFormData({ ...formData, attending: val })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ответ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">С удовольствием приду</SelectItem>
                    <SelectItem value="no">К сожалению, не смогу</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <AnimatePresence>
                {formData.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Блок ЕДА */}
                    <div className="space-y-3">
                      <Label className="text-gray-400 uppercase text-[10px] tracking-[0.2em]">
                        Предпочтения в меню
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {foodOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-[#d1bfa7] transition-colors"
                          >
                            <Checkbox
                              id={option.id}
                              checked={formData.food.includes(option.label)}
                              onCheckedChange={() =>
                                handleCheckboxChange("food", option.label)
                              }
                            />
                            <label
                              htmlFor={option.id}
                              className="text-sm cursor-pointer select-none"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Блок АЛКОГОЛЬ */}
                    <div className="space-y-3">
                      <Label className="text-gray-400 uppercase text-[10px] tracking-[0.2em]">
                        Напитки
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {drinkOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-[#d1bfa7] transition-colors"
                          >
                            <Checkbox
                              id={option.id}
                              checked={formData.drinks.includes(option.label)}
                              onCheckedChange={() =>
                                handleCheckboxChange("drinks", option.label)
                              }
                            />
                            <label
                              htmlFor={option.id}
                              className="text-sm cursor-pointer select-none"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                className="w-full bg-[#d1bfa7] hover:bg-[#c4af94] text-white py-6 text-lg transition-all duration-300"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Отправка..." : "Отправить ответ"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Field,
//   FieldLabel,
//   FieldGroup,
//   FieldError
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

// const rsvpSchema = z.object({
//   name: z.string().min(2, "Введите имя"),
//   attending: z.enum(["yes", "no"]),
//   food: z.array(z.string()).min(1, "Выберите меню"),
//   drinks: z.array(z.string()).min(1, "Выберите напитки"),
// });

// export const RsvpForm = () => {
//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
//     resolver: zodResolver(rsvpSchema),
//     defaultValues: { attending: "yes", food: [], drinks: [] }
//   });

//   const attending = watch("attending");

//   const onSubmit = (data) => console.log("Данные:", data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-8 p-8 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50">

//       {/* ИМЯ */}
//       <Field>
//         <FieldLabel>Ваше Имя</FieldLabel>
//         <FieldGroup>
//           <Input {...register("name")} placeholder="Имя Фамилия" />
//         </FieldGroup>
//         <FieldError>{errors.name?.message}</FieldError>
//       </Field>

//       {/* ПРИСУТСТВИЕ */}
//       <Field>
//         <FieldLabel>Придете ли вы?</FieldLabel>
//         <FieldGroup>
//           <select
//             className="w-full p-2 border rounded-md bg-white"
//             onChange={(e) => setValue("attending", e.target.value)}
//           >
//             <option value="yes">Да, с радостью</option>
//             <option value="no">К сожалению, нет</option>
//           </select>
//         </FieldGroup>
//       </Field>

//       {attending === "yes" && (
//         <div className="space-y-8 pt-4 border-t border-dashed border-gray-200">

//           {/* ЕДА */}
//           <Field>
//             <FieldLabel>Предпочтения в еде</FieldLabel>
//             <div className="grid grid-cols-2 gap-4 pt-2">
//               {["Мясо", "Рыба", "Веган"].map(item => (
//                 <div key={item} className="flex items-center space-x-2">
//                   <Checkbox
//                     onCheckedChange={(checked) => {
//                       const current = watch("food");
//                       setValue("food", checked ? [...current, item] : current.filter(i => i !== item));
//                     }}
//                   />
//                   <span className="text-sm">{item}</span>
//                 </div>
//               ))}
//             </div>
//             <FieldError>{errors.food?.message}</FieldError>
//           </Field>

//           {/* НАПИТКИ */}
//           <Field>
//             <FieldLabel>Напитки</FieldLabel>
//             <div className="grid grid-cols-2 gap-4 pt-2">
//               {["Вино", "Шампань", "Крепкое"].map(item => (
//                 <div key={item} className="flex items-center space-x-2">
//                   <Checkbox
//                     onCheckedChange={(checked) => {
//                       const current = watch("drinks");
//                       setValue("drinks", checked ? [...current, item] : current.filter(i => i !== item));
//                     }}
//                   />
//                   <span className="text-sm">{item}</span>
//                 </div>
//               ))}
//             </div>
//             <FieldError>{errors.drinks?.message}</FieldError>
//           </Field>
//         </div>
//       )}

//       <Button type="submit" className="w-full bg-[#d1bfa7] py-6 shadow-md hover:shadow-lg transition-all">
//         ОТПРАВИТЬ ПРИГЛАШЕНИЕ
//       </Button>
//     </form>
//   );
// };
