import { Character, teamDisplayNames } from '../data/characters';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, FileText } from 'lucide-react';

interface SheetViewProps {
  selected: Character[];
  title: string;
  author: string;
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
}

export default function SheetView({
  selected,
  title,
  author,
  onTitleChange,
  onAuthorChange
}: SheetViewProps) {
  const exportJson = () => {
    const data = JSON.stringify({ title, author, characters: selected }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const content = `
${title}
Created by: ${author}

Characters:
${selected.map((char, index) => `${index + 1}. ${char.name} (${teamDisplayNames[char.team]})`).join('\n')}

Abilities:
${selected.map((char) => `${char.name}: ${char.ability}`).join('\n\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const teamGroups = selected.reduce((groups, character) => {
    const team = character.team;
    if (!groups[team]) {
      groups[team] = [];
    }
    groups[team].push(character);
    return groups;
  }, {} as Record<string, Character[]>);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>스크립트 시트</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportJson}
              disabled={selected.length === 0}
            >
              <FileText className="w-4 h-4 mr-2" />
              JSON 내보내기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportPdf}
              disabled={selected.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              텍스트 내보내기
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">스크립트 제목</label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="스크립트 제목을 입력하세요..."
            />
          </div>
          <div>
            <label className="block text-sm mb-2">작성자</label>
            <Input
              value={author}
              onChange={(e) => onAuthorChange(e.target.value)}
              placeholder="작성자 이름을 입력하세요..."
            />
          </div>
        </div>
      </div>

      <Card id="sheet-content">
        <CardHeader>
          <CardTitle>{title || '제목 없는 스크립트'}</CardTitle>
          <p className="text-sm text-muted-foreground">
            작성자: {author || '알 수 없음'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(teamGroups).map(([team, characters]) => (
              <div key={team}>
                <h3 className="mb-3 pb-2 border-b border-border">
                  {teamDisplayNames[team as keyof typeof teamDisplayNames]} ({characters.length})
                </h3>
                <div className="space-y-3">
                  {characters.map((character) => (
                    <div key={character.id} className="p-3 bg-muted rounded">
                      <h4>{character.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {character.ability}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {selected.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                선택된 캐릭터가 없습니다. 스크립트를 보려면 캐릭터를 추가하세요.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}