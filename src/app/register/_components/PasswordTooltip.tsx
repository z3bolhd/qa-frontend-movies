import { TooltipContent, TooltipProvider, Tooltip, TooltipTrigger } from "@components/ui/tooltip";

const PasswordTooltip = () => (
  <div>
    <TooltipProvider>
      <Tooltip>
        <p className="text-sm mt-2">
          Пароль должен соответствовать{" "}
          <TooltipTrigger
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <span className="font-bold">требованиям</span>
          </TooltipTrigger>
        </p>
        <TooltipContent>
          <ul className="text-md list-disc ml-3 text-sm py-1">
            <li>Не менее 8 символов</li>
            <li>Не более 32 символов</li>
            <li>Только латинские или кириллические буквы</li>
            <li>Как минимум одна заглавная и одна строчная буква</li>
            <li>Только арабские цифры</li>
            <li>Как минимум одна цифра</li>
            <li>Без пробелов</li>
            <li>
              Другие допустимые символы:~ ! ? @ # $ % ^ & * _ - + ( ) [ ] {} {">"} {"<"} / \ | " ' .
              , : ;
            </li>
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

export default PasswordTooltip;
